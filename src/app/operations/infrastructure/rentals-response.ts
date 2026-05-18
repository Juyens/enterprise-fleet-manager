import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Represents the API response structure for a list of rentals.
 */
export interface RentalsResponse extends BaseResponse {
  /**
   * The list of rentals returned by the API.
   */
  rentals: RentalResource[];
}

/**
 * Represents the API resource/DTO for a rental.
 */
export interface RentalResource extends BaseResource {
  id: number;
  vehicleId: number;
  clientId: number;
  startDate: string;
  endDate: string;
  durationDays: number;
  totalCost: number;
  status: string;
}
