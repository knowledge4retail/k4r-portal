import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { K4RStore } from '../apis/portal/models';
import { AppNotification } from '../models/AppNotification';
import { Service } from '../models/Service';
import { ServicesFilter } from '../models/ServicesFilter';
import { SortedServices } from '../models/SortedServices';
import { UserInfo } from '../models/User';
import * as AppActions from './app.actions';
import { AppState } from './app.reducer';
import * as AppSelectors from './app.selectors';

@Injectable()
export class AppFacade {
  isLoggedIn$: Observable<boolean> = this.store.select(
    AppSelectors.selectIsLoggedIn
  );
  user$: Observable<UserInfo | null> = this.store.select(
    AppSelectors.selectUser
  );
  notifications$: Observable<AppNotification[] | null> = this.store.select(
    AppSelectors.selectNotifications
  );
  services$: Observable<Service[]> = this.store.select(
    AppSelectors.selectServices
  );
  filteredServices$: Observable<SortedServices> = this.store.select(
    AppSelectors.selectFilteredServices
  );
  favorites$: Observable<Service[]> = this.store.select(
    AppSelectors.selectFavorites
  );
  servicesFilter$: Observable<ServicesFilter> = this.store.select(
    AppSelectors.selectServicesFilter
  );
  refreshHealthStatus$: Observable<boolean> = this.store.select(
    AppSelectors.selectRefreshHealthStatus
  );
  stores$: Observable<K4RStore[]> = this.store.select(
    AppSelectors.selectStores
  );

  constructor(private store: Store<AppState>) {}

  init() {
    this.store.dispatch(AppActions.init());
  }

  setIsLoggedIn(val: boolean) {
    this.store.dispatch(AppActions.setIsLoggedIn({ val }));
  }

  logOut(): void {
    this.store.dispatch(AppActions.logOut());
  }

  loadK4RComponents(): void {
    this.store.dispatch(AppActions.loadK4RComponents());
  }

  setRefreshHealthStatus(val: boolean): void {
    this.store.dispatch(AppActions.setRefreshHealthStatus({ val }));
  }

  setServicesFilter(val: ServicesFilter): void {
    this.store.dispatch(AppActions.setServicesFilter({ val }));
  }

  loadStores(): void {
    this.store.dispatch(AppActions.loadStores());
  }

  setServiceFavorite(name: string): void {
    this.store.dispatch(AppActions.setServiceFavorite({ name }));
  }

  removeServiceFavorite(name: string): void {
    this.store.dispatch(AppActions.removeServiceFavorite({ name }));
  }

  setNotificationsViewed(notifications: AppNotification[]): void {
    this.store.dispatch(AppActions.setNotificationsViewed({ notifications }));
  }
}
