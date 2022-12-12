import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppFacade } from './+state/app.facade';
import { AppNotification } from './models/AppNotification';
import { NavItem } from './models/NavItem';
import { UserInfo } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      page: '/dashboard',
      icon: 'dashboard',
      external: false,
    },
    {
      label: 'Stores',
      page: '/stores',
      icon: 'storefront',
      external: false,
    },
    {
      label: 'DT Schema',
      page: '/dt-schema',
      icon: 'schema',
      external: true,
      href: environment.dtSchemaPath,
    },
  ];
  sideNavOpened: boolean = false;
  mobileQuery: MediaQueryList;
  isLoggedIn$: Observable<boolean> = this.appFacade.isLoggedIn$;
  user$: Observable<UserInfo | null> = this.appFacade.user$;
  notifications$: Observable<AppNotification[] | null> =
    this.appFacade.notifications$;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private appFacade: AppFacade
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.appFacade.init();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logOut(): void {
    this.appFacade.logOut();
  }

  onSetNotificationsViewed(notifications: AppNotification[]): void {
    this.appFacade.setNotificationsViewed(notifications);
  }
}
