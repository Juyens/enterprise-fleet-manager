import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Vehicle } from '../domain/model/vehicle.entity';
import { HttpClient } from '@angular/common/http';
import { VehiclesApiEndpoint } from './vehicles-api-endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MastersApi extends BaseApi {
  private vehiclesApiEndpoint: VehiclesApiEndpoint;

  constructor(private http: HttpClient) {
    super();
    this.vehiclesApiEndpoint = new VehiclesApiEndpoint(http);
  }

  /**
   * Retrieves a list of vehicles from the API.
   * @returns An observable of Vehicle[] containing the list of vehicles.
   */
  getVehicles(): Observable<Vehicle[]> {
    return this.vehiclesApiEndpoint.getAll();
  }

  /**
   * Retrieves a vehicle by its ID from the API.
   * @param id - The ID of the vehicle to retrieve.
   * @returns An observable of Vehicle containing the requested vehicle.
   */
  getVehicleById(id: number): Observable<Vehicle> {
    return this.vehiclesApiEndpoint.getById(id);
  }
}
