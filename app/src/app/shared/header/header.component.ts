import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppNotification } from 'src/app/models/AppNotification';
import { UserInfo } from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  opened: boolean = false;

  @Input()
  isLoggedIn: boolean | null = false;

  @Input()
  user: UserInfo | null = null;

  @Input()
  notifications: AppNotification[] | null = null;

  @Output()
  toggleSideNav: EventEmitter<null> = new EventEmitter<null>();

  @Output()
  triggerLogOut: EventEmitter<null> = new EventEmitter<null>();

  @Output()
  setNotificationsViewed: EventEmitter<AppNotification[]> = new EventEmitter<
    AppNotification[]
  >();

  toggleMenu() {
    this.toggleSideNav.emit();
  }

  logOut() {
    this.triggerLogOut.emit();
  }

  onSetNotificationsViewed() {
    this.notifications && this.setNotificationsViewed.emit(this.notifications);
  }
}
