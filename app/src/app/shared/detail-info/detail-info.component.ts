import { Component, Input } from '@angular/core';
import { K4RStore } from 'src/app/apis/portal/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss'],
})
export class DetailInfoComponent {
  @Input()
  data: K4RStore | undefined;

  @Input()
  showStorevizButton = true;

  env = environment;
}
