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
    const activeRentals = this.store.rentals().filter((r) => r.status === 'ACTIVE');
    const rentedIds = new Set(activeRentals.map((r) => r.vehicleId));
    return this.mastersStore
      .vehicles()
      .filter((v) => !rentedIds.has(v.id) && v.status !== 'MAINTENANCE');
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
