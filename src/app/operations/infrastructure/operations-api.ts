import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Incident } from '../domain/model/incident.entity';
import { Rental } from '../domain/model/rental.entity';
import { HttpClient } from '@angular/common/http';
import { IncidentsApiEndpoint } from './incidents-api-endpoint';
import { RentalsApiEndpoint } from './rentals-api-endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperationsApi extends BaseApi {
  private incidentsApiEndpoint: IncidentsApiEndpoint;
  private rentalsApiEndpoint: RentalsApiEndpoint;

  constructor(private http: HttpClient) {
    super();
    this.incidentsApiEndpoint = new IncidentsApiEndpoint(http);
    this.rentalsApiEndpoint = new RentalsApiEndpoint(http);
  }

  /**
   * Retrieves a list of incidents from the API.
   * @returns An observable of Incident[] containing the list of incidents.
   */
  getIncidents(): Observable<Incident[]> {
    return this.incidentsApiEndpoint.getAll();
  }

  /**
   * Retrieves a list of incidents from the API.
   * @returns An observable of Incident[] containing the list of incidents.
   */
  getIncidentById(id: number): Observable<Incident> {
    return this.incidentsApiEndpoint.getById(id);
  }

  /**
   * Retrieves a list of rentals from the API.
   * @returns An observable of Rental[] containing the list of rentals.
   */
  getRentals(): Observable<Rental[]> {
    return this.rentalsApiEndpoint.getAll();
  }

  /**
   * Retrieves a rental by its ID from the API.
   * @param id - The ID of the rental to retrieve.
   * @returns An observable of Rental containing the requested rental.
   */
  getRentalById(id: number): Observable<Rental> {
    return this.rentalsApiEndpoint.getById(id);
  }

  /**
   * Creates a new rental in the API.
   * @param rental - The rental to create.
   * @returns An observable of Rental containing the created rental.
   */
  createRental(rental: Rental): Observable<Rental> {
    return this.rentalsApiEndpoint.create(rental);
  }

  /**
   * Creates a new incident in the API.
   * @param incident - The incident to create.
   * @returns An observable of Incident containing the created incident.
   */
  createIncident(incident: Incident): Observable<Incident> {
    return this.incidentsApiEndpoint.create(incident);
  }

  /**
   * Updates an existing rental in the API.
   * @param rental - The updated rental.
   * @returns An observable of Rental containing the updated rental.
   */
  updateRental(rental: Rental): Observable<Rental> {
    return this.rentalsApiEndpoint.update(rental, rental.id);
  }

  /**
   * Deletes a rental from the API.
   * @param id - The ID of the rental to delete.
   * @returns An observable of void indicating successful deletion.
   */
  deleteRental(id: number): Observable<void> {
    return this.rentalsApiEndpoint.delete(id);
  }
}
