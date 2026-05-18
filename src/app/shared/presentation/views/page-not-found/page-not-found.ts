// page-not-found.ts
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  imports: [MatButtonModule, RouterLink, TranslatePipe],
  templateUrl: './page-not-found.html',
})
export class PageNotFound {
  protected invalidPath = inject(Router).url;
}
