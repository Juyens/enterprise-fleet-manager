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
