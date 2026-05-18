import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import { Incident } from '../domain/model/incident.entity';
import { IncidentResource, IncidentsResponse } from './incidents-response';

export class IncidentAssembler implements BaseAssembler<Incident, IncidentResource, IncidentsResponse> {
  /**
   * Converts an IncidentsResponse to an array of Incident entities.
   * @param response - The API response containing Incidents.
   * @returns An array of Incident entities.
   */
  toEntitiesFromResponse(response: IncidentsResponse): Incident[] {
    return response.incidents.map((resource) =>
      this.toEntityFromResource(resource as IncidentResource),
    );
  }

  /**
   * Converts an IncidentResource to an Incident entity.
   * @param resource - The resource to convert.
   * @returns The converted Incident entity.
   */
  toEntityFromResource(resource: IncidentResource): Incident {
    return new Incident({
      id: resource.id,
      vehicleId: resource.vehicleId,
      rentalId: resource.rentalId,
      incidentType: resource.incidentType,
      registeredAt: resource.registeredAt,
      estimatedRepairCost: resource.estimatedRepairCost,
      priority: resource.priority,
    });
  }

  /**
   * Converts an Incident entity to an IncidentResource.
   * @param entity - The entity to convert.
   * @returns The converted IncidentResource.
   */
  toResourceFromEntity(entity: Incident): IncidentResource {
    return {
      id: entity.id,
      vehicleId: entity.vehicleId,
      rentalId: entity.rentalId,
      incidentType: entity.incidentType,
      registeredAt: entity.registeredAt,
      estimatedRepairCost: entity.estimatedRepairCost,
      priority: entity.priority,
    } as IncidentResource;
  }
}
