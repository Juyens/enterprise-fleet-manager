import { Injectable } from '@angular/core';
import { computed, Signal, signal } from '@angular/core';
import { Vehicle } from '../domain/model/vehicle.entity';
import { MastersApi } from '../infrastructure/masters-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MastersStore {
  private readonly vehiclesSignal = signal<Vehicle[]>([]);
  readonly vehicles = this.vehiclesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly vehiclesCount = computed(() => this.vehicles().length);

  constructor(private readonly mastersApi: MastersApi) {
    this.loadVehicles();
  }

  /**
   * Gets a vehicle by its ID.
   * @param id - The ID of the vehicle to retrieve.
   * @returns The vehicle with the specified ID, or undefined if not found.
   */
  getVehicleById(id: number) {
    return computed(() => id ? this.vehicles().find(vehicle => vehicle.id === id) : undefined)
  }

  /**
   * Loads vehicles from the API.
   * @private
   */
  private loadVehicles() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.mastersApi
      .getVehicles()
      .pipe(takeUntilDestroyed(), retry(3)).subscribe({
        next: (vehicles) => {
          console.log(vehicles);
          this.vehiclesSignal.set(vehicles);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load vehicles'));
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
