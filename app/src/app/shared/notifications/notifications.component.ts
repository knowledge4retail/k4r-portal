import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppNotification } from 'src/app/models/AppNotification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  @Input()
  data!: AppNotification[];

  @Output()
  setNotificationsViewed: EventEmitter<null> = new EventEmitter<null>();

  onSetViewed() {
    this.setNotificationsViewed.emit();
  }
}
