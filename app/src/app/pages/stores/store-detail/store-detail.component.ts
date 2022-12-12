import { Component, Input } from '@angular/core';
import { K4RStore } from 'src/app/apis/portal/models';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss'],
})
export class StoreDetailComponent {
  @Input()
  data: K4RStore | undefined;
}
