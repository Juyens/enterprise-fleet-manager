import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslatePipe } from '@ngx-translate/core';
import { VehicleTypeStats } from '../vehicle-type-stats/vehicle-type-stats';
import { OperationsStore } from '../../../application/operations-store';

@Component({
  selector: 'app-fleet-utilization-analytics',
  imports: [MatGridListModule, VehicleTypeStats, TranslatePipe],
  templateUrl: './fleet-utilization-analytics.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetUtilizationAnalytics {
  protected readonly store = inject(OperationsStore);
}
