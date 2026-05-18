import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { OperationsStore } from '../../../application/operations-store';

@Component({
  selector: 'app-next-urgent-incident',
  imports: [MatCardModule, TranslatePipe, DatePipe],
  templateUrl: './next-urgent-incident.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextUrgentIncident {
  protected readonly store = inject(OperationsStore);
}
