/**
 * View model representing aggregated statistics per vehicle type.
 * @summary Computed read model combining vehicles and incidents.
 */
export interface VehicleTypeStats {
  vehicleType: string;
  dailyRevenuePotential: number;
  estimatedIncidentCost: number;
  vehiclesRented: number;
}
