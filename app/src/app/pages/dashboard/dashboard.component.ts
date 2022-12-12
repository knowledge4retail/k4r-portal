import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppFacade } from 'src/app/+state/app.facade';
import { FavoriteEvent } from 'src/app/models/FavoriteEvent';
import { Service } from 'src/app/models/Service';
import { ServicesFilter } from 'src/app/models/ServicesFilter';
import { SortedServices } from 'src/app/models/SortedServices';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  services$: Observable<SortedServices> | undefined;
  favorites$: Observable<Service[]> | undefined;
  servicesFilter$: Observable<ServicesFilter> | undefined;

  constructor(private appFacade: AppFacade) {}

  ngOnInit(): void {
    this.services$ = this.appFacade.filteredServices$;
    this.favorites$ = this.appFacade.favorites$;
    this.servicesFilter$ = this.appFacade.servicesFilter$;
    this.appFacade.setRefreshHealthStatus(true);
    this.appFacade.loadK4RComponents();
  }

  ngOnDestroy(): void {
    this.appFacade.setRefreshHealthStatus(false);
  }

  onTriggerFilter(val: ServicesFilter): void {
    this.appFacade.setServicesFilter(val);
  }

  onUpdateServiceFavorite(e: FavoriteEvent): void {
    if (e.favorite) {
      this.appFacade.removeServiceFavorite(e.name);
    } else {
      this.appFacade.setServiceFavorite(e.name);
    }
  }
}
