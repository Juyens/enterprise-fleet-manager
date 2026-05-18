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
