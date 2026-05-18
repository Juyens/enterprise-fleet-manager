# Proyecto Enterprise Fleet Manager

Aplicación web de gestión de flota para Enterprise Rent-A-Car. Incluye dashboard
de utilización de flota, costos de incidentes, y creación de alquileres con
generación automática de incidente de limpieza.

## Creación del proyecto

> [!CAUTION]
> **En el caso de estar en un equipo MAC:**
> - Debe anteceder el comando `sudo` al ejecutar las instrucciones: `ng` y `chown`, y luego ingresar la contraseña del Administrador.
> - Debe ubicarse en la carpeta de su preferencia.

> [!CAUTION]
> **En el caso de estar en un equipo Windows:**
> - Debe ubicarse en la carpeta `IdeaProjects/` o en otra de su preferencia.

A continuación se detalla las instrucciones para crear un nuevo `workspace` e `initial starter app` de Angular. Más información en: https://angular.dev/tools/cli/setup-local

### Creación de un workspace y un initial application

**Cargar** el `Terminal` del sistema Operativo, ubicarse en la carpeta de su preferencia y **ejecutar** el siguiente CLI command:

```bash
ng new enterprise-fleet-manager
```

_? Which stylesheet format would you like to use?_, **Seleccionar**:
```
CSS
```

_? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)?_, **digitar**:
```
N
```

_? Do you want to create a 'zoneless' application without zone.js?_, **digitar**:
```
N
```

_? Which AI tools do you want to configure with Angular best practices?_, **Seleccionar**:
```
(*) GitHub Copilot
(*) JetBrains AI Assistant
```

### Instalación de Angular Material

**Ingresar** a la carpeta creada:
```
cd enterprise-fleet-manager
```

**Agregar** Angular Material a la aplicación:
```
ng add @angular/material
```

_? Select a pair of starter prebuilt color palettes_, **seleccionar**:
```
Azure/Blue
```

### Instalando Internationalization en/es

```
npm install @ngx-translate/core @ngx-translate/http-loader --save
```

### Instalando Json-server

```
npm install -g json-server@0.17.4
```

## Desarrollo del proyecto

**Cargar** el IDE y **abrir** el proyecto.

**Cargar** el `Terminal` del IDE y **ejecutar**:
```
ng serve --port 4200
```

### Creación de los Archivos de idiomas

**Crear** las carpetas: `assets` e `i18n` en la carpeta `public`:

```markdown
- 📂 public
  - 📁 assets
    - 📁 i18n
```

**Crear** los archivos `en.json` y `es.json` en la carpeta `i18n`:

#### en.json
```json
{
  "option": {
    "home": "Home",
    "new-rental": "New Rental"
  },
  "home": {
    "title": "Home",
    "content": "Welcome to Enterprise Rent-A-Car",
    "fleet-utilization": "Fleet Utilization Analytics",
    "next-urgent-incident": "Next Urgent Incident"
  },
  "stats": {
    "daily-revenue": "Daily Revenue Potential",
    "incident-cost": "Estimated Incident Cost",
    "vehicles-rented": "Vehicles Rented"
  },
  "incident": {
    "vehicle-id": "Vehicle ID",
    "priority": "Priority",
    "cost": "Estimated Repair Cost",
    "registered-at": "Registered At"
  },
  "new-rental": {
    "title": "New Rental",
    "subtitle": "Create a New Rental Contract",
    "vehicle": "Vehicle",
    "client-id": "Client ID",
    "duration": "Duration (days)",
    "create": "Create",
    "cancel": "Cancel"
  },
  "page-not-found": {
    "title": "Page not found",
    "content": "The path <strong>{{ invalidPath }}</strong> is not valid.",
    "go-home": "Go Home"
  },
  "footer": {
    "rights": "All rights reserved.",
    "powered-by": "Powered by",
    "and": "and"
  }
}
```

#### es.json
```json
{
  "option": {
    "home": "Inicio",
    "new-rental": "Nuevo Alquiler"
  },
  "home": {
    "title": "Inicio",
    "content": "Bienvenido a Enterprise Rent-A-Car",
    "fleet-utilization": "Análisis de Utilización de Flota",
    "next-urgent-incident": "Próximo Incidente Urgente"
  },
  "stats": {
    "daily-revenue": "Ingreso Diario Potencial",
    "incident-cost": "Costo Estimado de Incidentes",
    "vehicles-rented": "Vehículos Alquilados"
  },
  "incident": {
    "vehicle-id": "ID del Vehículo",
    "priority": "Prioridad",
    "cost": "Costo Estimado de Reparación",
    "registered-at": "Registrado el"
  },
  "new-rental": {
    "title": "Nuevo Alquiler",
    "subtitle": "Crear un Nuevo Contrato de Alquiler",
    "vehicle": "Vehículo",
    "client-id": "ID del Cliente",
    "duration": "Duración (días)",
    "create": "Crear",
    "cancel": "Cancelar"
  },
  "page-not-found": {
    "title": "Página no encontrada",
    "content": "La ruta <strong>{{ invalidPath }}</strong> no es válida.",
    "go-home": "Ir a Inicio"
  },
  "footer": {
    "rights": "Todos los derechos reservados.",
    "powered-by": "Desarrollado con",
    "and": "y"
  }
}
```

### Configuración de JSON-Server

**Crear** la carpeta `server` en la raíz del proyecto:

```markdown
- 📂 enterprise-fleet-manager
  - 📁 server
```

**Crear** los archivos `db.json` y `routes.json` en la carpeta `server`:

#### db.json
```json
{
  "vehicles": [
    { "id": 501, "make": "Toyota", "model": "Corolla", "mileageKm": 15000, "dailyRate": 50.0, "vehicleType": "ECONOMY", "status": "RENTED" },
    { "id": 502, "make": "Ford", "model": "Explorer", "mileageKm": 45000, "dailyRate": 75.0, "vehicleType": "SUV", "status": "AVAILABLE" },
    { "id": 503, "make": "Audi", "model": "A4", "mileageKm": 5000, "dailyRate": 120.0, "vehicleType": "LUXURY", "status": "MAINTENANCE" },
    { "id": 504, "make": "Nissan", "model": "Versa", "mileageKm": 22000, "dailyRate": 45.0, "vehicleType": "ECONOMY", "status": "RENTED" },
    { "id": 505, "make": "Jeep", "model": "Cherokee", "mileageKm": 18000, "dailyRate": 85.0, "vehicleType": "SUV", "status": "RENTED" },
    { "id": 506, "make": "BMW", "model": "Series 3", "mileageKm": 12000, "dailyRate": 150.0, "vehicleType": "LUXURY", "status": "AVAILABLE" }
  ],
  "rentals": [
    { "id": 1001, "vehicleId": 501, "clientId": 201, "startDate": "2025-10-10", "endDate": "2025-10-18", "durationDays": 8, "totalCost": 400, "status": "ACTIVE" },
    { "id": 1002, "vehicleId": 504, "clientId": 202, "startDate": "2025-10-12", "endDate": "2025-10-15", "durationDays": 3, "totalCost": 135, "status": "ACTIVE" },
    { "id": 1003, "vehicleId": 505, "clientId": 203, "startDate": "2025-10-15", "endDate": "2025-10-20", "durationDays": 5, "totalCost": 425, "status": "ACTIVE" },
    { "id": 1004, "vehicleId": 502, "clientId": 204, "startDate": "2025-09-01", "endDate": "2025-09-05", "durationDays": 4, "totalCost": 300, "status": "COMPLETED" }
  ],
  "incidents": [
    { "id": 2001, "vehicleId": 501, "rentalId": 1001, "incidentType": "DAMAGE", "registeredAt": "2025-10-12T10:00:00Z", "estimatedRepairCost": 200.0, "priority": "HIGH" },
    { "id": 2002, "vehicleId": 504, "rentalId": 1002, "incidentType": "CLEANING", "registeredAt": "2025-10-13T08:30:00Z", "estimatedRepairCost": 50.0, "priority": "NORMAL" },
    { "id": 2003, "vehicleId": 505, "rentalId": 1003, "incidentType": "BREAKDOWN", "registeredAt": "2025-10-16T14:20:00Z", "estimatedRepairCost": 500.0, "priority": "HIGH" }
  ]
}
```

#### routes.json
```json
{
  "/api/v1/*": "/$1"
}
```

**Cargar** el `Terminal` del IDE y **agregar** un nuevo `Tab`.

**Ejecutar** el siguiente command para iniciar el `json-server`:
```
json-server --watch server/db.json --routes server/routes.json
```

**Cargar** el navegador e **ingrese** los URLs:
- http://localhost:3000/api/v1/vehicles
- http://localhost:3000/api/v1/rentals
- http://localhost:3000/api/v1/incidents

### Configuración de environments

**Ejecutar** el siguiente CLI command:
```bash
ng generate environments
```

**Agregar** los siguientes valores a `environment.development.ts`:

```ts
export const environment = {
  production: false,
  rentacarProviderApiBaseUrl: 'http://localhost:3000/api/v1',
  rentacarProviderVehiclesEndpointPath: '/vehicles',
  rentacarProviderRentalsEndpointPath: '/rentals',
  rentacarProviderIncidentsEndpointPath: '/incidents',
};
```

**Agregar** los siguientes valores a `environment.ts`:

```ts
export const environment = {
  production: true,
  rentacarProviderApiBaseUrl: 'http://localhost:3000/api/v1',
  rentacarProviderVehiclesEndpointPath: '/vehicles',
  rentacarProviderRentalsEndpointPath: '/rentals',
  rentacarProviderIncidentsEndpointPath: '/incidents',
};
```

### Configuración del appConfig

**Agregar** los siguientes imports al archivo `app.config.ts`:

```ts
import { provideAppInitializer, inject } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
```

**Agregar** los siguientes métodos al array `providers` de `appConfig`:

```ts
provideHttpClient(),
provideTranslateService({
  loader: provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json' }),
  lang: 'en',
  fallbackLang: 'en',
}),
provideAppInitializer(() => {
  const stored = localStorage.getItem('app.lang');
  const translate = inject(TranslateService);
  const lang = stored || translate.getBrowserLang() || 'en';
  return translate.use(lang);
}),
```

### Creación de la estructura del proyecto

**Crear** la siguiente estructura de carpetas en `/src/app`:

```markdown
- 📂 src
  - 📂 app
    - 📂 masters
      - 📁 application
      - 📁 domain
        - 📁 model
      - 📁 infrastructure
      - 📁 presentation
        - 📁 views
    - 📂 operations
      - 📁 application
      - 📁 domain
        - 📁 model
      - 📁 infrastructure
      - 📁 presentation
        - 📁 components
        - 📁 views
    - 📂 shared
      - 📁 infrastructure
      - 📁 presentation
        - 📁 components
        - 📁 views
```

## Creación de las interfaces y clases Base

### Creación de la interface BaseEntity

```bash
ng generate interface shared/infrastructure/base-entity
```

**Reemplazar** el contenido del archivo `base-entity.ts`:

```ts
export interface BaseEntity {
  id: number;
}
```

### Creación de la interface BaseResponse

```bash
ng generate interface shared/infrastructure/base-response
```

**Reemplazar** el contenido del archivo `base-response.ts`:

```ts
export interface BaseResponse {}

export interface BaseResource {
  id: number;
}
```

### Creación de la interface BaseAssembler

```bash
ng generate interface shared/infrastructure/base-assembler
```

**Reemplazar** el contenido del archivo `base-assembler.ts`:

```ts
import { BaseResource, BaseResponse } from './base-response';
import { BaseEntity } from './base-entity';

export interface BaseAssembler<TEntity extends BaseEntity, TResource extends BaseResource, TResponse extends BaseResponse> {
  toEntityFromResource(resource: TResource): TEntity;
  toResourceFromEntity(entity: TEntity): TResource;
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
```

### Creación de la abstract class BaseApi

```bash
ng generate class shared/infrastructure/base-api --skip-tests=true
```

**Reemplazar** el contenido del archivo `base-api.ts`:

```ts
export abstract class BaseApi {}
```

### Creación de la abstract class BaseApiEndpoint

```bash
ng generate class shared/infrastructure/base-api-endpoint --skip-tests=true
```

**Reemplazar** el contenido del archivo `base-api-endpoint.ts`:

```ts
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseEntity } from './base-entity';
import { BaseResource, BaseResponse } from './base-response';
import { BaseAssembler } from './base-assembler';

export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>
> {
  constructor(
    protected http: HttpClient,
    protected endpointUrl: string,
    protected assembler: TAssembler
  ) {}

  getAll(): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response.map(resource => this.assembler.toEntityFromResource(resource));
        }
        return this.assembler.toEntitiesFromResponse(response as TResponse);
      }),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  getById(id: number): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to fetch entity'))
    );
  }

  create(entity: TEntity): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.post<TResource>(this.endpointUrl, resource).pipe(
      map(created => this.assembler.toEntityFromResource(created)),
      catchError(this.handleError('Failed to create entity'))
    );
  }

  update(entity: TEntity, id: number): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.put<TResource>(`${this.endpointUrl}/${id}`, resource).pipe(
      map(updated => this.assembler.toEntityFromResource(updated)),
      catchError(this.handleError('Failed to update entity'))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to delete entity'))
    );
  }

  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let errorMessage = operation;
      if (error.status === 404) errorMessage = `${operation}: Resource not found`;
      else if (error.error instanceof ErrorEvent) errorMessage = `${operation}: ${error.error.message}`;
      else errorMessage = `${operation}: ${error.statusText || 'Unexpected error'}`;
      return throwError(() => new Error(errorMessage));
    };
  }
}
```

## Bounded Context: masters

### Analizando el endpoint vehicles

Diríjase al endpoint local http://localhost:3000/api/v1/vehicles y **evalúe** el JSON de respuesta.

### Creación de la interface VehiclesResponse

```bash
ng generate interface masters/infrastructure/vehicles-response
```

**Reemplazar** el contenido:

```ts
import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface VehiclesResponse extends BaseResponse {
  vehicles: VehicleResource[];
}

export interface VehicleResource extends BaseResource {
  id: number;
  make: string;
  model: string;
  mileageKm: number;
  dailyRate: number;
  vehicleType: string;
  status: string;
}
```

### Creación del class Vehicle (entity)

```bash
ng generate class masters/domain/model/vehicle --type=entity --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Vehicle implements BaseEntity {
  private _id: number;
  private _make: string;
  private _model: string;
  private _mileageKm: number;
  private _dailyRate: number;
  private _vehicleType: string;
  private _status: string;

  constructor(vehicle: {
    id: number;
    make: string;
    model: string;
    mileageKm: number;
    dailyRate: number;
    vehicleType: string;
    status: string;
  }) {
    this._id = vehicle.id;
    this._make = vehicle.make;
    this._model = vehicle.model;
    this._mileageKm = vehicle.mileageKm;
    this._dailyRate = vehicle.dailyRate;
    this._vehicleType = vehicle.vehicleType;
    this._status = vehicle.status;
  }

  get id() { return this._id; }
  set id(v: number) { this._id = v; }
  get make() { return this._make; }
  set make(v: string) { this._make = v; }
  get model() { return this._model; }
  set model(v: string) { this._model = v; }
  get mileageKm() { return this._mileageKm; }
  set mileageKm(v: number) { this._mileageKm = v; }
  get dailyRate() { return this._dailyRate; }
  set dailyRate(v: number) { this._dailyRate = v; }
  get vehicleType() { return this._vehicleType; }
  set vehicleType(v: string) { this._vehicleType = v; }
  get status() { return this._status; }
  set status(v: string) { this._status = v; }
}
```

### Creación del class VehicleAssembler

```bash
ng generate class masters/infrastructure/vehicle-assembler --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Vehicle } from '../domain/model/vehicle.entity';
import { VehicleResource, VehiclesResponse } from './vehicles-response';

export class VehicleAssembler implements BaseAssembler<Vehicle, VehicleResource, VehiclesResponse> {
  toEntitiesFromResponse(response: VehiclesResponse): Vehicle[] {
    return response.vehicles.map(r => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: VehicleResource): Vehicle {
    return new Vehicle({
      id: resource.id,
      make: resource.make,
      model: resource.model,
      mileageKm: resource.mileageKm,
      dailyRate: resource.dailyRate,
      vehicleType: resource.vehicleType,
      status: resource.status,
    });
  }

  toResourceFromEntity(entity: Vehicle): VehicleResource {
    return {
      id: entity.id,
      make: entity.make,
      model: entity.model,
      mileageKm: entity.mileageKm,
      dailyRate: entity.dailyRate,
      vehicleType: entity.vehicleType,
      status: entity.status,
    } as VehicleResource;
  }
}
```

### Creación del class VehiclesApiEndpoint

```bash
ng generate class masters/infrastructure/vehicles-api-endpoint --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Vehicle } from '../domain/model/vehicle.entity';
import { VehicleResource, VehiclesResponse } from './vehicles-response';
import { VehicleAssembler } from './vehicle-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class VehiclesApiEndpoint extends BaseApiEndpoint<Vehicle, VehicleResource, VehiclesResponse, VehicleAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.rentacarProviderApiBaseUrl}${environment.rentacarProviderVehiclesEndpointPath}`,
      new VehicleAssembler()
    );
  }
}
```

### Creación del MastersApi Service

```bash
ng generate service masters/infrastructure/masters-api --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Vehicle } from '../domain/model/vehicle.entity';
import { HttpClient } from '@angular/common/http';
import { VehiclesApiEndpoint } from './vehicles-api-endpoint';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MastersApi extends BaseApi {
  private vehiclesApiEndpoint: VehiclesApiEndpoint;

  constructor(private http: HttpClient) {
    super();
    this.vehiclesApiEndpoint = new VehiclesApiEndpoint(http);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.vehiclesApiEndpoint.getAll();
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.vehiclesApiEndpoint.getById(id);
  }
}
```

### Creación del MastersStore (Application Layer)

```bash
ng generate service masters/application/masters-store --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { Injectable, computed, signal } from '@angular/core';
import { Vehicle } from '../domain/model/vehicle.entity';
import { MastersApi } from '../infrastructure/masters-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

@Injectable({ providedIn: 'root' })
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

  getVehicleById(id: number) {
    return computed(() => id ? this.vehicles().find(v => v.id === id) : undefined);
  }

  private loadVehicles() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.mastersApi.getVehicles().pipe(takeUntilDestroyed(), retry(3)).subscribe({
      next: vehicles => {
        this.vehiclesSignal.set(vehicles);
        this.loadingSignal.set(false);
      },
      error: error => {
        this.errorSignal.set(this.formatError(error, 'Failed to load vehicles'));
        this.loadingSignal.set(false);
      },
    });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}
```

## Bounded Context: operations

### Creación de la interface RentalsResponse

```bash
ng generate interface operations/infrastructure/rentals-response
```

**Reemplazar** el contenido:

```ts
import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface RentalsResponse extends BaseResponse {
  rentals: RentalResource[];
}

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
```

### Creación del class Rental (entity)

```bash
ng generate class operations/domain/model/rental --type=entity --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { Vehicle } from '../../../masters/domain/model/vehicle.entity';

export class Rental implements BaseEntity {
  private _id: number;
  private _vehicleId: number;
  private _clientId: number;
  private _startDate: string;
  private _endDate: string;
  private _durationDays: number;
  private _totalCost: number;
  private _status: string;
  private _vehicle: Vehicle | null;

  constructor(rental: {
    id: number;
    vehicleId: number;
    clientId: number;
    startDate: string;
    endDate: string;
    durationDays: number;
    totalCost: number;
    status: string;
    vehicle?: Vehicle | null;
  }) {
    this._id = rental.id;
    this._vehicleId = rental.vehicleId;
    this._clientId = rental.clientId;
    this._startDate = rental.startDate;
    this._endDate = rental.endDate;
    this._durationDays = rental.durationDays;
    this._totalCost = rental.totalCost;
    this._status = rental.status;
    this._vehicle = rental.vehicle ?? null;
  }

  get id() { return this._id; }
  set id(v: number) { this._id = v; }
  get vehicleId() { return this._vehicleId; }
  set vehicleId(v: number) { this._vehicleId = v; }
  get clientId() { return this._clientId; }
  set clientId(v: number) { this._clientId = v; }
  get startDate() { return this._startDate; }
  set startDate(v: string) { this._startDate = v; }
  get endDate() { return this._endDate; }
  set endDate(v: string) { this._endDate = v; }
  get durationDays() { return this._durationDays; }
  set durationDays(v: number) { this._durationDays = v; }
  get totalCost() { return this._totalCost; }
  set totalCost(v: number) { this._totalCost = v; }
  get status() { return this._status; }
  set status(v: string) { this._status = v; }
  get vehicle() { return this._vehicle; }
  set vehicle(v: Vehicle | null) { this._vehicle = v; }
}
```

### Creación del class RentalAssembler

```bash
ng generate class operations/infrastructure/rental-assembler --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Rental } from '../domain/model/rental.entity';
import { RentalResource, RentalsResponse } from './rentals-response';

export class RentalAssembler implements BaseAssembler<Rental, RentalResource, RentalsResponse> {
  toEntitiesFromResponse(response: RentalsResponse): Rental[] {
    return response.rentals.map(r => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: RentalResource): Rental {
    return new Rental({
      id: resource.id,
      vehicleId: resource.vehicleId,
      clientId: resource.clientId,
      startDate: resource.startDate,
      endDate: resource.endDate,
      durationDays: resource.durationDays,
      totalCost: resource.totalCost,
      status: resource.status,
    });
  }

  toResourceFromEntity(entity: Rental): RentalResource {
    return {
      id: entity.id,
      vehicleId: entity.vehicleId,
      clientId: entity.clientId,
      startDate: entity.startDate,
      endDate: entity.endDate,
      durationDays: entity.durationDays,
      totalCost: entity.totalCost,
      status: entity.status,
    } as RentalResource;
  }
}
```

### Creación del class RentalsApiEndpoint

```bash
ng generate class operations/infrastructure/rentals-api-endpoint --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Rental } from '../domain/model/rental.entity';
import { RentalResource, RentalsResponse } from './rentals-response';
import { RentalAssembler } from './rental-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class RentalsApiEndpoint extends BaseApiEndpoint<Rental, RentalResource, RentalsResponse, RentalAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.rentacarProviderApiBaseUrl}${environment.rentacarProviderRentalsEndpointPath}`,
      new RentalAssembler()
    );
  }
}
```

### Creación de la interface IncidentsResponse

```bash
ng generate interface operations/infrastructure/incidents-response
```

**Reemplazar** el contenido:

```ts
import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface IncidentsResponse extends BaseResponse {
  incidents: IncidentResource[];
}

export interface IncidentResource extends BaseResource {
  id: number;
  vehicleId: number;
  rentalId: number;
  incidentType: string;
  registeredAt: string;
  estimatedRepairCost: number;
  priority: string;
}
```

### Creación del class Incident (entity)

```bash
ng generate class operations/domain/model/incident --type=entity --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { BaseEntity } from '../../../shared/infrastructure/base-entity';
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

  get id() { return this._id; }
  set id(v: number) { this._id = v; }
  get vehicleId() { return this._vehicleId; }
  set vehicleId(v: number) { this._vehicleId = v; }
  get rentalId() { return this._rentalId; }
  set rentalId(v: number) { this._rentalId = v; }
  get incidentType() { return this._incidentType; }
  set incidentType(v: string) { this._incidentType = v; }
  get registeredAt() { return this._registeredAt; }
  set registeredAt(v: string) { this._registeredAt = v; }
  get estimatedRepairCost() { return this._estimatedRepairCost; }
  set estimatedRepairCost(v: number) { this._estimatedRepairCost = v; }
  get priority() { return this._priority; }
  set priority(v: string) { this._priority = v; }
  get vehicle() { return this._vehicle; }
  set vehicle(v: Vehicle | null) { this._vehicle = v; }
}
```

### Creación del class IncidentAssembler

```bash
ng generate class operations/infrastructure/incident-assembler --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Incident } from '../domain/model/incident.entity';
import { IncidentResource, IncidentsResponse } from './incidents-response';

export class IncidentAssembler implements BaseAssembler<Incident, IncidentResource, IncidentsResponse> {
  toEntitiesFromResponse(response: IncidentsResponse): Incident[] {
    return response.incidents.map(r => this.toEntityFromResource(r));
  }

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
```

### Creación del class IncidentsApiEndpoint

```bash
ng generate class operations/infrastructure/incidents-api-endpoint --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Incident } from '../domain/model/incident.entity';
import { IncidentResource, IncidentsResponse } from './incidents-response';
import { IncidentAssembler } from './incident-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class IncidentsApiEndpoint extends BaseApiEndpoint<Incident, IncidentResource, IncidentsResponse, IncidentAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.rentacarProviderApiBaseUrl}${environment.rentacarProviderIncidentsEndpointPath}`,
      new IncidentAssembler()
    );
  }
}
```

### Creación del OperationsApi Service

```bash
ng generate service operations/infrastructure/operations-api --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Incident } from '../domain/model/incident.entity';
import { Rental } from '../domain/model/rental.entity';
import { HttpClient } from '@angular/common/http';
import { IncidentsApiEndpoint } from './incidents-api-endpoint';
import { RentalsApiEndpoint } from './rentals-api-endpoint';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OperationsApi extends BaseApi {
  private incidentsApiEndpoint: IncidentsApiEndpoint;
  private rentalsApiEndpoint: RentalsApiEndpoint;

  constructor(private http: HttpClient) {
    super();
    this.incidentsApiEndpoint = new IncidentsApiEndpoint(http);
    this.rentalsApiEndpoint = new RentalsApiEndpoint(http);
  }

  getIncidents(): Observable<Incident[]> {
    return this.incidentsApiEndpoint.getAll();
  }

  getIncidentById(id: number): Observable<Incident> {
    return this.incidentsApiEndpoint.getById(id);
  }

  getRentals(): Observable<Rental[]> {
    return this.rentalsApiEndpoint.getAll();
  }

  getRentalById(id: number): Observable<Rental> {
    return this.rentalsApiEndpoint.getById(id);
  }

  createRental(rental: Rental): Observable<Rental> {
    return this.rentalsApiEndpoint.create(rental);
  }

  createIncident(incident: Incident): Observable<Incident> {
    return this.incidentsApiEndpoint.create(incident);
  }

  updateRental(rental: Rental): Observable<Rental> {
    return this.rentalsApiEndpoint.update(rental, rental.id);
  }

  deleteRental(id: number): Observable<void> {
    return this.rentalsApiEndpoint.delete(id);
  }
}
```

### Creación de la interface VehicleTypeStats (View Model)

**Crear** el archivo `vehicle-type-stats.ts` en `operations/application`:

```ts
export interface VehicleTypeStats {
  vehicleType: string;
  dailyRevenuePotential: number;
  estimatedIncidentCost: number;
  vehiclesRented: number;
}
```

### Creación del OperationsStore (Application Layer)

```bash
ng generate service operations/application/operations-store --skip-tests=true
```

**Reemplazar** el contenido:

```ts
import { Injectable, inject, computed, signal } from '@angular/core';
import { Rental } from '../domain/model/rental.entity';
import { Incident } from '../domain/model/incident.entity';
import { OperationsApi } from '../infrastructure/operations-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { MastersStore } from '../../masters/application/masters-store';
import { VehicleTypeStats } from './vehicle-type-stats';

@Injectable({ providedIn: 'root' })
export class OperationsStore {
  private readonly rentalsSignal = signal<Rental[]>([]);
  private readonly incidentsSignal = signal<Incident[]>([]);

  readonly rentals = this.rentalsSignal.asReadonly();
  readonly incidents = this.incidentsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private readonly mastersStore: MastersStore;

  constructor(private readonly operationsApi: OperationsApi) {
    this.mastersStore = inject(MastersStore);
    this.loadRentals();
    this.loadIncidents();
  }

  readonly fleetUtilization = computed<VehicleTypeStats[]>(() => {
    const vehicles = this.mastersStore.vehicles();
    const incidents = this.incidents();
    const types = [...new Set(vehicles.map(v => v.vehicleType))];

    return types.map(type => {
      const ofType = vehicles.filter(v => v.vehicleType === type);
      const rented = ofType.filter(v => v.status === 'RENTED');
      const ids = ofType.map(v => v.id);
      const related = incidents.filter(i => ids.includes(i.vehicleId));

      const dailyRevenuePotential = rented.reduce((s, v) => s + v.dailyRate, 0);
      const estimatedIncidentCost = Math.round(
        related.reduce((s, i) => s + i.estimatedRepairCost * (i.priority === 'HIGH' ? 2 : 1), 0) * 100
      ) / 100;

      return {
        vehicleType: type,
        dailyRevenuePotential,
        estimatedIncidentCost,
        vehiclesRented: rented.length,
      };
    });
  });

  readonly nextUrgentIncident = computed(() => {
    const normal = this.incidents().filter(i => i.priority === 'NORMAL');
    if (normal.length === 0) return null;
    return [...normal].sort((a, b) => +new Date(b.registeredAt) - +new Date(a.registeredAt))[0];
  });

  addRental(input: { vehicleId: number; clientId: number; durationDays: number }): boolean {
    const vehicle = this.mastersStore.getVehicleById(input.vehicleId)();
    if (!vehicle) {
      this.errorSignal.set('Vehicle not found');
      return false;
    }

    const alreadyActive = this.rentals().some(r => r.vehicleId === input.vehicleId && r.status === 'ACTIVE');
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
    this.operationsApi.createRental(rental).pipe(retry(3)).subscribe({
      next: created => {
        this.rentalsSignal.update(rs => [...rs, created]);
        this.createCleaningIncident(created);
        this.loadingSignal.set(false);
      },
      error: e => {
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
      next: created => this.incidentsSignal.update(is => [...is, created]),
    });
  }

  private loadRentals() {
    this.loadingSignal.set(true);
    this.operationsApi.getRentals().pipe(takeUntilDestroyed(), retry(3)).subscribe({
      next: rentals => {
        this.rentalsSignal.set(rentals);
        this.loadingSignal.set(false);
      },
      error: e => {
        this.errorSignal.set(this.formatError(e, 'Failed to load rentals'));
        this.loadingSignal.set(false);
      },
    });
  }

  private loadIncidents() {
    this.loadingSignal.set(true);
    this.operationsApi.getIncidents().pipe(takeUntilDestroyed(), retry(3)).subscribe({
      next: incidents => {
        this.incidentsSignal.set(incidents);
        this.loadingSignal.set(false);
      },
      error: e => {
        this.errorSignal.set(this.formatError(e, 'Failed to load incidents'));
        this.loadingSignal.set(false);
      },
    });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }
}
```

## Creación de componentes shared

```bash
ng generate component shared/presentation/components/footer-content --skip-tests=true
ng generate component shared/presentation/components/language-switcher --skip-tests=true
ng generate component shared/presentation/components/layout --skip-tests=true
ng generate component shared/presentation/views/home --skip-tests=true
ng generate component shared/presentation/views/page-not-found --skip-tests=true
```

### Modificación del LanguageSwitcher Component

**Reemplazar** el contenido de `language-switcher.ts`:

```ts
import { Component, DestroyRef, inject } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleGroup, MatButtonToggle],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  protected currentLang: string = 'en';
  protected languages: string[] = ['en', 'es'];
  private translate: TranslateService;

  constructor() {
    this.translate = inject(TranslateService);
    this.currentLang = this.translate.getCurrentLang() || 'en';
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language;
    localStorage.setItem('app.lang', language);
  }
}
```

**Reemplazar** el contenido de `language-switcher.html`:

```html
<mat-button-toggle-group [value]="currentLang"
                         appearance="standard"
                         aria-label="Preferred language"
                         name="language">
  @for (language of languages; track language) {
    <mat-button-toggle [value]="language"
                       [aria-label]="language"
                       (click)="useLanguage(language)">
      {{ language.toUpperCase() }}
    </mat-button-toggle>
  }
</mat-button-toggle-group>
```

### Modificación del FooterContent Component

**Reemplazar** el contenido de `footer-content.ts`:

```ts
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-content',
  imports: [TranslatePipe],
  templateUrl: './footer-content.html',
  styleUrl: './footer-content.css',
})
export class FooterContent {}
```

**Reemplazar** el contenido de `footer-content.html`:

```html
<div class="footer-content">
  <p>Copyright &copy; 2025 Enterprise Rent-A-Car. {{ 'footer.rights' | translate }}</p>
  <p>{{ 'footer.powered-by' | translate }}
    <a href="https://material.angular.dev/" target="_blank">Angular Material</a>
    {{ 'footer.and' | translate }}
    <a href="https://ngx-translate.org/" target="_blank">ngx-translate</a>
  </p>
</div>
```

**Reemplazar** el contenido de `footer-content.css`:

```css
.footer-content {
  width: 100%;
  background-color: #006B3F;
  color: white;
  text-align: center;
  padding: 16px;
  box-sizing: border-box;
  margin-top: auto;
}

.footer-content a {
  color: white;
  text-decoration: underline;
}
```

### Modificación del Layout Component

**Reemplazar** el contenido de `layout.ts`:

```ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { FooterContent } from '../footer-content/footer-content';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarRow,
    MatToolbar,
    MatButton,
    RouterLinkActive,
    TranslatePipe,
    LanguageSwitcher,
    FooterContent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  options = [
    { link: '/home', label: 'option.home' },
    { link: '/operations/rentals/new', label: 'option.new-rental' },
  ];
}
```

**Reemplazar** el contenido de `layout.html`:

```html
<mat-toolbar>
  <mat-toolbar-row class="toolbar-grid">
    <div class="brand">
      <img src="https://logo.clearbit.com/enterprise.com" alt="Enterprise" width="32" height="32"/>
      <h1>Enterprise Fleet Manager</h1>
    </div>
    <nav class="nav-center" aria-label="Main navigation">
      @for (option of options; track option.label) {
        <a mat-button [routerLink]="option.link" routerLinkActive="active">{{ option.label | translate }}</a>
      }
    </nav>
    <div class="lang">
      <app-language-switcher/>
    </div>
  </mat-toolbar-row>
</mat-toolbar>
<router-outlet/>
<app-footer-content/>
```

**Reemplazar** el contenido de `layout.css`:

```css
mat-toolbar {
  background-color: #006B3F;
  color: white;
}

.toolbar-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
}

.brand {
  justify-self: start;
  display: flex;
  gap: 8px;
  align-items: center;
}

.brand h1 {
  font-size: 1.25rem;
  margin: 0;
  font-weight: 500;
}

.brand img {
  background: white;
  border-radius: 4px;
  padding: 2px;
}

.nav-center {
  justify-self: center;
  display: flex;
  gap: 8px;
}

.nav-center a {
  color: white;
}

.nav-center a.active {
  background-color: rgba(255, 255, 255, 0.15);
}

.lang {
  justify-self: end;
}
```

### Modificación del PageNotFound Component

**Reemplazar** el contenido de `page-not-found.ts`:

```ts
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  imports: [MatButtonModule, RouterLink, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound {
  protected invalidPath = inject(Router).url;
}
```

**Reemplazar** el contenido de `page-not-found.html`:

```html
<section class="page-not-found">
  <h1>{{ 'page-not-found.title' | translate }}</h1>
  <p [innerHTML]="'page-not-found.content' | translate: { invalidPath: invalidPath }"></p>
  <a mat-raised-button color="primary" routerLink="/home">{{ 'page-not-found.go-home' | translate }}</a>
</section>
```

**Reemplazar** el contenido de `page-not-found.css`:

```css
.page-not-found {
  text-align: center;
  padding: 64px 24px;
}

.page-not-found h1 {
  font-size: 3rem;
  color: #006B3F;
  margin: 0 0 16px 0;
}
```

## Creación de componentes operations

```bash
ng generate component operations/presentation/components/vehicle-type-stats --skip-tests=true
ng generate component operations/presentation/components/fleet-utilization-analytics --skip-tests=true
ng generate component operations/presentation/components/next-urgent-incident --skip-tests=true
ng generate component operations/presentation/views/new-rental --skip-tests=true
```

### Modificación del VehicleTypeStats Component

**Reemplazar** el contenido de `vehicle-type-stats.ts`:

```ts
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { VehicleTypeStats as Stats } from '../../../application/vehicle-type-stats';

@Component({
  selector: 'app-vehicle-type-stats',
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './vehicle-type-stats.html',
  styleUrl: './vehicle-type-stats.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleTypeStats {
  stats: InputSignal<Stats> = input.required<Stats>();
}
```

**Reemplazar** el contenido de `vehicle-type-stats.html`:

```html
<mat-card appearance="outlined">
  <mat-card-header>
    <mat-card-title>{{ stats().vehicleType }}</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p><strong>{{ 'stats.daily-revenue' | translate }}:</strong> {{ stats().dailyRevenuePotential }}</p>
    <p><strong>{{ 'stats.incident-cost' | translate }}:</strong> {{ stats().estimatedIncidentCost }}</p>
  </mat-card-content>
  <mat-card-footer>
    <p>{{ 'stats.vehicles-rented' | translate }}: {{ stats().vehiclesRented }}</p>
  </mat-card-footer>
</mat-card>
```

**Reemplazar** el contenido de `vehicle-type-stats.css`:

```css
:host {
  display: block;
  width: 100%;
  height: 100%;
}

mat-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

mat-card-header {
  background-color: #006B3F;
  color: white;
  padding: 12px 16px;
  margin: 0 0 16px 0;
}

mat-card-title {
  font-size: 1.25rem;
  margin: 0;
}

mat-card-content {
  flex: 1;
}

mat-card-content p {
  margin: 8px 0;
  font-size: 0.95rem;
}

mat-card-footer {
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  margin: 16px -16px -16px -16px;
}

mat-card-footer p {
  margin: 0;
  font-weight: 500;
}
```

### Modificación del FleetUtilizationAnalytics Component

**Reemplazar** el contenido de `fleet-utilization-analytics.ts`:

```ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslatePipe } from '@ngx-translate/core';
import { VehicleTypeStats } from '../vehicle-type-stats/vehicle-type-stats';
import { OperationsStore } from '../../../application/operations-store';

@Component({
  selector: 'app-fleet-utilization-analytics',
  imports: [MatGridListModule, VehicleTypeStats, TranslatePipe],
  templateUrl: './fleet-utilization-analytics.html',
  styleUrl: './fleet-utilization-analytics.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetUtilizationAnalytics {
  protected readonly store = inject(OperationsStore);
}
```

**Reemplazar** el contenido de `fleet-utilization-analytics.html`:

```html
<h2>{{ 'home.fleet-utilization' | translate }}</h2>
<mat-grid-list cols="3" rowHeight="300px" gutterSize="16px">
  @for (s of store.fleetUtilization(); track s.vehicleType) {
    <mat-grid-tile>
      <app-vehicle-type-stats [stats]="s"/>
    </mat-grid-tile>
  }
</mat-grid-list>
```

### Modificación del NextUrgentIncident Component

**Reemplazar** el contenido de `next-urgent-incident.ts`:

```ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { OperationsStore } from '../../../application/operations-store';

@Component({
  selector: 'app-next-urgent-incident',
  imports: [MatCardModule, TranslatePipe, DatePipe],
  templateUrl: './next-urgent-incident.html',
  styleUrl: './next-urgent-incident.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextUrgentIncident {
  protected readonly store = inject(OperationsStore);
}
```

**Reemplazar** el contenido de `next-urgent-incident.html`:

```html
<h2>{{ 'home.next-urgent-incident' | translate }}</h2>
@if (store.nextUrgentIncident(); as incident) {
  <mat-card appearance="outlined">
    <mat-card-header>
      <mat-card-title>{{ incident.incidentType }}</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <p><strong>{{ 'incident.vehicle-id' | translate }}:</strong> {{ incident.vehicleId }}</p>
      <p><strong>{{ 'incident.priority' | translate }}:</strong> {{ incident.priority }}</p>
      <p><strong>{{ 'incident.cost' | translate }}:</strong> {{ incident.estimatedRepairCost }}</p>
      <p><strong>{{ 'incident.registered-at' | translate }}:</strong> {{ incident.registeredAt | date:'short' }}</p>
    </mat-card-content>
  </mat-card>
}
```

**Reemplazar** el contenido de `next-urgent-incident.css`:

```css
:host {
  display: block;
}

mat-card {
  max-width: 500px;
  border-left: 4px solid #ff9800;
}

mat-card-title {
  color: #006B3F;
}

mat-card-content p {
  margin: 8px 0;
}
```

### Modificación del Home View

**Reemplazar** el contenido de `home.ts`:

```ts
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FleetUtilizationAnalytics } from '../../../../operations/presentation/components/fleet-utilization-analytics/fleet-utilization-analytics';
import { NextUrgentIncident } from '../../../../operations/presentation/components/next-urgent-incident/next-urgent-incident';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, FleetUtilizationAnalytics, NextUrgentIncident],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
```

**Reemplazar** el contenido de `home.html`:

```html
<section class="home">
  <h1>{{ 'home.title' | translate }}</h1>
  <p>{{ 'home.content' | translate }}</p>
  <app-fleet-utilization-analytics/>
  <app-next-urgent-incident/>
</section>
```

**Reemplazar** el contenido de `home.css`:

```css
:host {
  display: block;
}

.home {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.home h1 {
  font-size: 2rem;
  font-weight: 300;
  margin: 0;
  color: #006B3F;
}

.home > p {
  font-size: 1.1rem;
  color: #555;
  margin: 0;
}

h2 {
  font-size: 1.5rem;
  font-weight: 500;
  color: #006B3F;
  margin: 0 0 16px 0;
  border-bottom: 2px solid #006B3F;
  padding-bottom: 8px;
}
```

### Modificación del NewRental View

**Reemplazar** el contenido de `new-rental.ts`:

```ts
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import { OperationsStore } from '../../../application/operations-store';
import { MastersStore } from '../../../../masters/application/masters-store';

@Component({
  selector: 'app-new-rental',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './new-rental.html',
  styleUrl: './new-rental.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewRental {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  protected store = inject(OperationsStore);
  protected mastersStore = inject(MastersStore);

  form = this.fb.group({
    vehicleId: new FormControl<number | null>(null, { validators: [Validators.required] }),
    clientId: new FormControl<number | null>(null, { validators: [Validators.required] }),
    durationDays: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  protected availableVehicles = computed(() => {
    const activeRentals = this.store.rentals().filter(r => r.status === 'ACTIVE');
    const rentedIds = new Set(activeRentals.map(r => r.vehicleId));
    return this.mastersStore.vehicles().filter(
      v => !rentedIds.has(v.id) && v.status !== 'MAINTENANCE'
    );
  });

  submit(): void {
    if (this.form.invalid) return;
    const ok = this.store.addRental({
      vehicleId: this.form.value.vehicleId!,
      clientId: this.form.value.clientId!,
      durationDays: this.form.value.durationDays!,
    });
    if (ok) this.router.navigate(['/home']);
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
```

**Reemplazar** el contenido de `new-rental.html`:

```html
<section class="new-rental">
  <h1>{{ 'new-rental.title' | translate }}</h1>
  <h3>{{ 'new-rental.subtitle' | translate }}</h3>

  <form [formGroup]="form" (ngSubmit)="submit()">
    <mat-form-field>
      <mat-label>{{ 'new-rental.vehicle' | translate }}</mat-label>
      <mat-select formControlName="vehicleId" required>
        @for (v of availableVehicles(); track v.id) {
          <mat-option [value]="v.id">{{ v.make }} {{ v.model }} ({{ v.vehicleType }})</mat-option>
        }
      </mat-select>
    </mat-form-field>

    <mat-form-field>
      <mat-label>{{ 'new-rental.client-id' | translate }}</mat-label>
      <input matInput type="number" formControlName="clientId" required>
    </mat-form-field>

    <mat-form-field>
      <mat-label>{{ 'new-rental.duration' | translate }}</mat-label>
      <input matInput type="number" formControlName="durationDays" required min="1">
    </mat-form-field>

    @if (store.error()) {
      <p class="error" role="alert">{{ store.error() }}</p>
    }

    <div class="actions">
      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
        {{ 'new-rental.create' | translate }}
      </button>
      <button mat-button type="button" (click)="cancel()">
        {{ 'new-rental.cancel' | translate }}
      </button>
    </div>
  </form>
</section>
```

**Reemplazar** el contenido de `new-rental.css`:

```css
:host {
  display: block;
}

.new-rental {
  max-width: 500px;
  margin: 0 auto;
}

.new-rental h1 {
  font-size: 2rem;
  font-weight: 300;
  color: #006B3F;
  margin: 0;
}

.new-rental h3 {
  font-weight: 400;
  color: #666;
  margin: 4px 0 24px 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

mat-form-field {
  width: 100%;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 16px;
}

.error {
  color: #d32f2f;
  margin: 0;
}
```

## Configuración de Routes

### Crear operations.routes

**Crear** el archivo `operations.routes.ts` en `operations/presentation/views`:

```ts
import { Routes } from '@angular/router';

const newRental = () => import('./new-rental/new-rental').then(m => m.NewRental);

export const operationsRoutes: Routes = [
  { path: 'rentals/new', loadComponent: newRental },
];
```

### Configuración de app.routes

**Reemplazar** el contenido de `app.routes.ts`:

```ts
import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);

const baseTitle = 'Enterprise Rent-A-Car';

export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} | Home` },
  {
    path: 'operations',
    loadChildren: () =>
      import('./operations/presentation/views/operations.routes').then(m => m.operationsRoutes),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} | Page Not Found` },
];
```

> [!IMPORTANT]
> La ruta `**` (wildcard) debe ir SIEMPRE al final, de lo contrario captura cualquier otra ruta.

## Modificación del App Component

**Reemplazar** el contenido de `app.ts`:

```ts
import { Component } from '@angular/core';
import { Layout } from './shared/presentation/components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
```

**Reemplazar** el contenido de `app.html`:

```html
<app-layout/>
```

## Estilos Globales

**Reemplazar** el contenido de `src/styles.css`:

```css
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: Roboto, sans-serif;
  background-color: #fafafa;
}

app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

mat-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
}

router-outlet + * {
  flex: 1;
  display: block;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

a {
  color: inherit;
}
```

## README.md

**Crear** o **reemplazar** el archivo `README.md` en la raíz del proyecto:

```markdown
# Enterprise Fleet Manager

Web application for Enterprise Rent-A-Car fleet management. Provides analytics on
vehicle utilization, incident costs, and rental creation with automatic cleaning
incident generation.

## Features
- Toolbar with Clearbit logo, navigation options and EN/ES language switcher
- Home view with Fleet Utilization Analytics and Next Urgent Incident sections
- New Rental form with auto-populated status, dates and totalCost
- Automatic CLEANING incident creation per Rental
- Validation: vehicle can have only one ACTIVE rental at a time
- Page Not Found view with invalid path display and home button

## Tech Stack
- Angular 21
- Angular Material
- @ngx-translate/core for i18n
- json-server as fake REST backend
- Angular Signals for State Management

## Run

Start backend:
\`\`\`
json-server --watch server/db.json --routes server/routes.json
\`\`\`

Start frontend:
\`\`\`
ng serve --port 4200
\`\`\`

## Author
<Tu Nombre Apellido>
```

## Empaquetado del proyecto

**Eliminar** la carpeta `node_modules`:

```bash
rm -rf node_modules
```

**Comprimir** el proyecto en formato `.zip` con el nombre `enterprise-fleet-manager.zip`.

## Actividad

- **Verificar** que todas las rutas funcionen: `/`, `/home`, `/operations/rentals/new`, `/cualquier-otra-cosa`.
- **Verificar** el switching de idioma EN/ES.
- **Crear** un nuevo Rental y validar que se genere automáticamente el Incident de tipo CLEANING.
- **Verificar** que un Vehicle no pueda tener dos Rentals con status ACTIVE simultáneamente.
- **Verificar** que el indicador Estimated Incident Cost esté redondeado a 2 decimales.
- **Verificar** accesibilidad (ARIA labels en toolbar y nav).
