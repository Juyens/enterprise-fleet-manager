import {BaseEntity} from '../../../shared/infrastructure/base-entity';
import { Vehicle } from '../../../masters/domain/model/vehicle.entity';

export class Incident implements BaseEntity {
  private _id: number;
  private _vehicleId: number;
  private _rentalId: number;
  private _incidentType: string;
  private _registeredAt: string;
  private _estimatedRepairCost: number;
  private _priority: string;
  private _vehicle: Vehicle | null;

  /**
   * Creates a new instance of the Incident class.
   * @param incident
   * @param incident.id - The unique identifier for the incident.
   * @param incident.vehicleId - The unique identifier for the associated vehicle.
   * @param incident.rentalId - The unique identifier for the associated rental.
   * @param incident.incidentType - The type of incident.
   * @param incident.registeredAt - The date and time when the incident was registered.
   * @param incident.estimatedRepairCost - The estimated repair cost for the incident.
   * @param incident.priority - The priority of the incident.
   * @param incident.vehicle - (Optional) The vehicle associated with the incident.
   */
  constructor(incident: {
    id: number;
    vehicleId: number;
    rentalId: number;
    incidentType: string;
    registeredAt: string;
    estimatedRepairCost: number;
    priority: string;
    vehicle?: Vehicle | null;
  }) {
    this._id = incident.id;
    this._vehicleId = incident.vehicleId;
    this._rentalId = incident.rentalId;
    this._incidentType = incident.incidentType;
    this._registeredAt = incident.registeredAt;
    this._estimatedRepairCost = incident.estimatedRepairCost;
    this._priority = incident.priority;
    this._vehicle = incident.vehicle ?? null;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get vehicleId(): number {
    return this._vehicleId;
  }

  set vehicleId(value: number) {
    this._vehicleId = value;
  }

  get rentalId(): number {
    return this._rentalId;
  }

  set rentalId(value: number) {
    this._rentalId = value;
  }

  get incidentType(): string {
    return this._incidentType;
  }

  set incidentType(value: string) {
    this._incidentType = value;
  }

  get registeredAt(): string {
    return this._registeredAt;
  }

  set registeredAt(value: string) {
    this._registeredAt = value;
  }

  get estimatedRepairCost(): number {
    return this._estimatedRepairCost;
  }

  set estimatedRepairCost(value: number) {
    this._estimatedRepairCost = value;
  }

  get priority(): string {
    return this._priority;
  }

  set priority(value: string) {
    this._priority = value;
  }

  /**
   * The vehicle associated with the incident.
   * @remarks This property is nullable.
   * This is an object reference to the {@link Vehicle} entity. Its way be null is not set.
   */
  get vehicle(): Vehicle | null {
    return this._vehicle;
  }

  /**
   * Set the vehicle associated with the incident.
   * @param value - The {@link Vehicle} entity to associate with the incident.
   */
  set vehicle(value: Vehicle | null) {
    this._vehicle = value;
  }
}
