import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Represents the API response structure for a list of incidents.
 */
export interface IncidentsResponse extends BaseResponse {
  /**
   * The list of incidents returned by the API.
   */
  incidents: IncidentResource[];
}

/**
 * Represents the API resource/DTO for an incident.
 */
export interface IncidentResource extends BaseResource {
  id: number;
  vehicleId: number;
  rentalId: number;
  incidentType: string;
  registeredAt: string;
  estimatedRepairCost: number;
  priority: string;
}

