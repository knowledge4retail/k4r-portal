import {
  Component,
  EventEmitter,
  Input, Output
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ServicesFilter } from 'src/app/models/ServicesFilter';

@Component({
  selector: 'app-service-cards-filter',
  templateUrl: './service-cards-filter.component.html',
  styleUrls: ['./service-cards-filter.component.scss'],
})
export class ServiceCardsFilterComponent {
  @Input()
  servicesFilter!: ServicesFilter;

  @Output()
  triggerFilter: EventEmitter<ServicesFilter> = new EventEmitter<ServicesFilter>();

  onFilter(e: Event | MatSlideToggleChange): void {
    this.triggerFilter.emit(this.servicesFilter);
  }
}
