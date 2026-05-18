import { inject, Injectable } from '@angular/core';
import { computed, Signal, signal } from '@angular/core';
import { Rental } from '../domain/model/rental.entity';
import { Incident } from '../domain/model/incident.entity';
import { OperationsApi } from '../infrastructure/operations-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { MastersStore } from '../../masters/application/masters-store';
import { VehicleTypeStats} from './vehicle-type-stats';

@Injectable({
  providedIn: 'root',
})
export class OperationsStore {
  private readonly rentalsSignal = signal<Rental[]>([]);
  private readonly incidentsSignal = signal<Incident[]>([]);

  readonly rentals = this.rentalsSignal.asReadonly();
  readonly incidents = this.incidentsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly rentalsCount = computed(() => this.rentals().length);
  readonly incidentsCount = computed(() => this.incidents().length);

  private readonly mastersStore: MastersStore;

  constructor(private readonly operationsApi: OperationsApi) {
    this.mastersStore = inject(MastersStore);
    this.loadRentals();
    this.loadIncidents();
  }

  /**
   * A computed property that calculates fleet utilization statistics for different vehicle types.
   * These statistics are generated based on vehicle data and incident reports.
   *
   * @type {Array<VehicleTypeStats>}
   *
   * @description
   * The `fleetUtilization` property generates a list of statistics for each unique vehicle type in the fleet.
   * The statistics include daily revenue potential, estimated cost of related incidents, and the number of vehicles currently rented.
   * The calculations are derived from the fleet data and related incidents from the datastore.
   *
   * Each vehicle type's data within the computed array contains:
   * - `vehicleType`: The type/category of the vehicle (e.g., Sedan, SUV, Truck).
   * - `dailyRevenuePotential`: The total potential daily revenue from vehicles of this type that are currently rented.
   * - `estimatedIncidentCost`: The estimated cost of all incidents associated with vehicles of this type,
   *   adjusted for priority (e.g., high-priority incidents have higher weights).
   * - `vehiclesRented`: The count of vehicles of this type that are currently in a rented status.
   *
   * This property is dynamically updated based on the current state of the vehicle master store (`mastersStore.vehicles`)
   * and the list of reported incidents (`incidents`).
   */
  readonly fleetUtilization = computed<VehicleTypeStats[]>(() => {
    const vehicles = this.mastersStore.vehicles();
    const incidents = this.incidents();
    const types = [...new Set(vehicles.map((v) => v.vehicleType))];

    return types.map((type) => {
      const ofType = vehicles.filter((v) => v.vehicleType === type);
      const rented = ofType.filter((v) => v.status === 'RENTED');
      const ids = ofType.map((v) => v.id);
      const related = incidents.filter((i) => ids.includes(i.vehicleId));

      const dailyRevenuePotential = rented.reduce((s, v) => s + v.dailyRate, 0);
      const estimatedIncidentCost =
        Math.round(
          related.reduce((s, i) => s + i.estimatedRepairCost * (i.priority === 'HIGH' ? 2 : 1), 0) *
            100,
        ) / 100;

      return {
        vehicleType: type,
        dailyRevenuePotential,
        estimatedIncidentCost,
        vehiclesRented: rented.length,
      };
    });
  });

  /**
   * A computed property that determines the next urgent incident based on priority and registration date.
   * It filters incidents with a priority of 'NORMAL', and if no such incidents exist, it returns null.
   * Otherwise, it sorts the filtered incidents in descending order by their registration date
   * and selects the most recently registered one as the next urgent incident.
   *
   * @type {Signal<Incident|null>} A reactive computed reference to the next urgent incident object or null.
   */
  readonly nextUrgentIncident = computed(() => {
    const normal = this.incidents().filter((i) => i.priority === 'NORMAL');
    if (normal.length === 0) return null;
    return [...normal].sort((a, b) => +new Date(b.registeredAt) - +new Date(a.registeredAt))[0];
  });

  /**
   * Gets an incident by its ID.
   * @param id - The ID of the incident to retrieve.
   * @returns The incident with the specified ID, or undefined if not found.
   */
  getIncidentById(id: number) {
    return computed(() =>
      id ? this.incidents().find((incident) => incident.id === id) : undefined,
    );
  }

  /**
   * Gets a rental by its ID.
   * @param id - The ID of the rental to retrieve.
   * @returns The rental with the specified ID, or undefined if not found.
   */
  getRentalById(id: number) {
    return computed(() => (id ? this.rentals().find((rental) => rental.id === id) : undefined));
  }

  /**
   * Adds a new rental entry for a specified vehicle and client, calculating the rental duration, cost, and status.
   * Performs validation to ensure the vehicle exists and is not already actively rented. Initiates a backend
   * operation to persist the rental.
   *
   * @param {Object} input - The details necessary to create the rental.
   * @param {number} input.vehicleId - The ID of the vehicle to be rented.
   * @param {number} input.clientId - The ID of the client renting the vehicle.
   * @param {number} input.durationDays - The number of days for the rental duration.
   * @return {boolean} Returns true if the rental creation process is successfully initiated, otherwise false.
   */
  addRental(input: { vehicleId: number; clientId: number; durationDays: number }): boolean {
    const vehicle = this.mastersStore.getVehicleById(input.vehicleId)();
    if (!vehicle) {
      this.errorSignal.set('Vehicle not found');
      return false;
    }

    const alreadyActive = this.rentals().some(
      (r) => r.vehicleId === input.vehicleId && r.status === 'ACTIVE',
    );
    if (alreadyActive) {
      this.errorSignal.set('Vehicle already has an ACTIVE rental');
      return false;
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + input.durationDays);

    const rental = new Rental({
      id: 0,
      vehicleId: input.vehicleId,
      clientId: input.clientId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      durationDays: input.durationDays,
      totalCost: input.durationDays * vehicle.dailyRate,
      status: 'ACTIVE',
    });

    this.loadingSignal.set(true);
    this.operationsApi
      .createRental(rental)
      .pipe(retry(3))
      .subscribe({
        next: (created) => {
          this.rentalsSignal.update((rs) => [...rs, created]);
          this.createCleaningIncident(created);
          this.loadingSignal.set(false);
        },
        error: (e) => {
          this.errorSignal.set(this.formatError(e, 'Failed to create rental'));
          this.loadingSignal.set(false);
        },
      });
    return true;
  }

  private createCleaningIncident(rental: Rental): void {
    const incident = new Incident({
      id: 0,
      vehicleId: rental.vehicleId,
      rentalId: rental.id,
      incidentType: 'CLEANING',
      registeredAt: new Date().toISOString(),
      estimatedRepairCost: 50.0,
      priority: 'NORMAL',
    });

    this.operationsApi.createIncident(incident).subscribe({
      next: (created) => this.incidentsSignal.update((is) => [...is, created]),
    });
  }

  private loadRentals() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.operationsApi
      .getRentals()
      .pipe(takeUntilDestroyed(), retry(3))
      .subscribe({
        next: (rentals) => {
          this.rentalsSignal.set(rentals);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load rentals'));
          this.loadingSignal.set(false);
        },
      });
  }

  private loadIncidents() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.operationsApi
      .getIncidents()
      .pipe(takeUntilDestroyed(), retry(3))
      .subscribe({
        next: (incidents) => {
          this.incidentsSignal.set(incidents);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load incidents'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Formats error messages for user-friendly display.
   * @param error - The error object.
   * @param fallback - The fallback error message.
   * @returns A formatted error message.
   */
  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}

export default OperationsStore;
