import { Component, Input } from '@angular/core';
import { K4RComponentHealthStatus } from 'src/app/apis/portal/models/k-4-r-component-health-status';

@Component({
  selector: 'app-health-indicator',
  templateUrl: './health-indicator.component.html',
  styleUrls: ['./health-indicator.component.scss'],
})
export class HealthIndicatorComponent {
  @Input()
  health: K4RComponentHealthStatus = K4RComponentHealthStatus.Pending;

  k4RComponentHealthStatus = K4RComponentHealthStatus;
}
