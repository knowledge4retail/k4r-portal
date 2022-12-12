import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoriteEvent } from 'src/app/models/FavoriteEvent';
import { Service } from 'src/app/models/Service';
import { SortedServices } from 'src/app/models/SortedServices';

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.component.html',
  styleUrls: ['./service-cards.component.scss'],
})
export class ServiceCardsComponent {
  @Input()
  data: SortedServices | null = null;

  @Input()
  favorites: Service[] | null = null;

  @Output()
  updateServiceFavorite: EventEmitter<FavoriteEvent> = new EventEmitter<FavoriteEvent>();

  onUpdateFavorites(e: FavoriteEvent): void {
    this.updateServiceFavorite.emit(e);
  }
}
