import { Component, EventEmitter, Input, Output } from '@angular/core';
import { K4RComponentType } from 'src/app/apis/portal/models/k-4-r-component-type';
import { FavoriteEvent } from 'src/app/models/FavoriteEvent';
import { Service } from 'src/app/models/Service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent {
  @Input()
  data!: Service;

  @Output()
  updateServiceFavorite: EventEmitter<FavoriteEvent> = new EventEmitter<FavoriteEvent>();

  updateFavorite(name: string, favorite: boolean): void {
    this.updateServiceFavorite.emit({ name, favorite });
  }
}
