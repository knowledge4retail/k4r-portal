import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, interval, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { K4RComponentHealth, K4RStore } from '../apis/portal/models';
import { K4RComponent } from '../apis/portal/models/k-4-r-component';
import { K4RStoreControllerService } from '../apis/portal/services';
import { K4RComponentControllerService } from '../apis/portal/services/k-4-r-component-controller.service';
import { AuthService } from '../auth/auth.service';
import { AppNotification } from '../models/AppNotification';
import { Service } from '../models/Service';
import { UserResponse } from '../models/User';
import { ServiceCardsService } from '../shared/service-cards/service-cards.service';
import * as AppActions from './app.actions';
import { AppFacade } from './app.facade';
import { newVersionsToken } from './app.reducer';

@Injectable()
export class AppEffects {
  initRefreshHealthStatusSubject$ = this.actions$.pipe(
    ofType(AppActions.setRefreshHealthStatus),
    filter((action) => action.val)
  );

  destroyRefreshHealthStatusSubject$ = this.actions$.pipe(
    ofType(AppActions.setRefreshHealthStatus),
    filter((action) => !action.val)
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private k4RComponentControllerService: K4RComponentControllerService,
    private k4RStoreControllerService: K4RStoreControllerService,
    private serviceCardsService: ServiceCardsService,
    private appFacade: AppFacade
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.init),
      map(() => {
        if (!this.authService.isLoggedIn()) {
          return AppActions.logIn();
        } else {
          return AppActions.setIsLoggedIn({ val: true });
        }
      })
    )
  );

  logIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.logIn),
        tap(() => this.authService.init())
      ),
    { dispatch: false }
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.setIsLoggedIn),
      switchMap(() =>
        this.authService.loadUser().pipe(
          map((res: UserResponse) =>
            AppActions.loadUserSuccess({ user: res.info })
          ),
          catchError((error) => of(AppActions.loadUserFailure({ error })))
        )
      )
    )
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.logOut, AppActions.loadUserFailure),
        tap(() => this.authService.logOut())
      ),
    { dispatch: false }
  );

  loadServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadK4RComponents),
      switchMap(() =>
        this.k4RComponentControllerService.getAllComponents().pipe(
          map((k4RComponents: K4RComponent[]) =>
            AppActions.loadK4RComponentsSuccess({
              k4RComponents:
                this.serviceCardsService.getComponentsFavorites(k4RComponents),
            })
          ),
          catchError((error) =>
            of(AppActions.loadK4RComponentsFailure({ error }))
          )
        )
      )
    )
  );

  setRefreshHealthStatus$ = createEffect(() =>
    this.initRefreshHealthStatusSubject$.pipe(
      switchMap((_) => {
        return interval(5000).pipe(
          takeUntil(this.destroyRefreshHealthStatusSubject$),
          switchMap((_) => of(AppActions.setRefreshHealthStatusSuccess()))
        );
      })
    )
  );

  loadHealthStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.setRefreshHealthStatusSuccess),
      withLatestFrom(this.appFacade.services$),
      switchMap(([action, services]) => {
        if (services) {
          const req$: Observable<K4RComponentHealth>[] = services.map((s) =>
            this.k4RComponentControllerService.getComponentHealth({
              serviceName: s.serviceName,
            })
          );
          return forkJoin(req$).pipe(
            map((res: K4RComponentHealth[]) => {
              services = services.map((s) => ({
                ...s,
                health: res.find((r) => r.serviceName === s.serviceName)
                  ?.status,
              })) as Service[];
              return AppActions.loadHealthStatusSuccess({ services });
            })
          );
        } else return of(AppActions.loadHealthStatusFailure({ error: '' }));
      })
    )
  );

  loadStores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadStores),
      switchMap(() =>
        this.k4RStoreControllerService.getAllStores().pipe(
          map((stores: K4RStore[]) => AppActions.loadStoresSuccess({ stores })),
          catchError((error) => of(AppActions.loadStoresFailure({ error })))
        )
      )
    )
  );

  setServiceFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.setServiceFavorite),
      map((action) => {
        this.serviceCardsService.addComponentsFavorite(action.name);
        return AppActions.updatedServiceFavorite({
          favorites: this.serviceCardsService.getFavoritesFromStorage(),
        });
      })
    )
  );

  removeServiceFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.removeServiceFavorite),
      map((action) => {
        this.serviceCardsService.removeComponentsFavorites(action.name);
        return AppActions.updatedServiceFavorite({
          favorites: this.serviceCardsService.getFavoritesFromStorage(),
        });
      })
    )
  );

  setNotificationsViewed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.setNotificationsViewed),
        tap(action => {
          const notificationsCopy: AppNotification[] = JSON.parse(
            JSON.stringify(action.notifications)
          ) as typeof action.notifications;
          notificationsCopy.forEach(n => n.viewed = true);
          localStorage.setItem(newVersionsToken, JSON.stringify(notificationsCopy))
        })
      ),
    { dispatch: false }
  );
}
