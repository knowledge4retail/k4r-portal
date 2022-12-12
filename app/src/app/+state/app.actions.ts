import { createAction, props } from '@ngrx/store';
import { K4RComponent, K4RStore } from '../apis/portal/models';
import { AppNotification } from '../models/AppNotification';
import { Service } from '../models/Service';
import { ServicesFilter } from '../models/ServicesFilter';
import { UserInfo } from '../models/User';

export const init = createAction('[K4R] Init');

export const logIn = createAction('[K4R] Log in');

export const setIsLoggedIn = createAction(
  '[K4R] Set setIsLoggedIn',
  props<{ val: boolean }>()
);

export const loadUserSuccess = createAction(
  '[K4R] Load User Success',
  props<{ user: UserInfo }>()
);

export const loadUserFailure = createAction(
  '[K4R] Load User Failure',
  props<{ error: any }>()
);

export const logOut = createAction('[K4R] Log out');

export const loadK4RComponents = createAction('[K4R] Load K4R Components');

export const loadK4RComponentsSuccess = createAction(
  '[K4R] Load K4R Components Success',
  props<{ k4RComponents: K4RComponent[] }>()
);

export const loadK4RComponentsFailure = createAction(
  '[K4R] Load K4R Components Failure',
  props<{ error: any }>()
);

export const setServiceFavorite = createAction(
  '[K4R] Set Service Favorite',
  props<{ name: string }>()
);

export const removeServiceFavorite = createAction(
  '[K4R] Remove Service Favorite',
  props<{ name: string }>()
);

export const updatedServiceFavorite = createAction(
  '[K4R] Updated Service Favorite',
  props<{ favorites: string[] | undefined }>()
);

export const loadHealthStatusSuccess = createAction(
  '[K4R] Load Health Status Success',
  props<{ services: Service[] }>()
);

export const loadHealthStatusFailure = createAction(
  '[K4R] Load Health Status Failure',
  props<{ error: any }>()
);

export const setRefreshHealthStatus = createAction(
  '[K4R] Set Refresh Health Status',
  props<{ val: boolean }>()
);

export const setRefreshHealthStatusSuccess = createAction(
  '[K4R] Set Refresh Health Status Success'
);

export const setServicesFilter = createAction(
  '[K4R] Set Services Filter',
  props<{ val: ServicesFilter }>()
);

export const loadStores = createAction('[K4R] Load Stores');

export const loadStoresSuccess = createAction(
  '[K4R] Load Stores Success',
  props<{ stores: K4RStore[] }>()
);

export const loadStoresFailure = createAction(
  '[K4R] Load Stores Failure',
  props<{ error: any }>()
);

export const setNotificationsViewed = createAction(
  '[K4R] Set Notifications Viewed',
  props<{ notifications: AppNotification[] }>()
);
