import { createReducer, on } from '@ngrx/store';
import { K4RStore } from '../apis/portal/models';
import { Service } from '../models/Service';
import { ServicesFilter } from '../models/ServicesFilter';
import { UserInfo } from '../models/User';
import * as AppActions from './app.actions';

export const appFeatureKey = 'k4r';
export const newVersionsToken = 'k4r_viewed_new_versions';

export interface AppState {
  isLoggedIn: boolean;
  user: UserInfo | null;
  services: Service[];
  servicesFilter: ServicesFilter;
  refreshHealthStatus: boolean;
  stores: K4RStore[];
}

export const initialState: AppState = {
  isLoggedIn: false,
  user: null,
  services: [],
  servicesFilter: {
    showApis: true,
    showWebUIs: true,
    showAdministratives: true,
    term: '',
  },
  refreshHealthStatus: false,
  stores: []
};

export const reducer = createReducer(
  initialState,

  on(
    AppActions.setIsLoggedIn,
    (state, payload): AppState => ({
      ...state,
      isLoggedIn: payload.val,
    })
  ),
  on(
    AppActions.loadUserSuccess,
    (state, payload): AppState => ({
      ...state,
      user: payload.user,
    })
  ),
  on(
    AppActions.loadK4RComponentsSuccess,
    (state, payload): AppState => ({
      ...state,
      services: payload.k4RComponents as Service[],
    })
  ),
  on(
    AppActions.loadHealthStatusSuccess,
    (state, payload): AppState => ({
      ...state,
      services: payload.services,
    })
  ),
  on(
    AppActions.setRefreshHealthStatus,
    (state, payload): AppState => ({
      ...state,
      refreshHealthStatus: payload.val,
    })
  ),
  on(
    AppActions.setServicesFilter,
    (state, payload): AppState => ({
      ...state,
      servicesFilter: replaceServicesFilter(payload.val),
    })
  ),
  on(
    AppActions.loadStoresSuccess,
    (state, payload): AppState => ({
      ...state,
      stores: payload.stores,
    })
  ),
  on(
    AppActions.updatedServiceFavorite,
    (state, payload): AppState => ({
      ...state,
      services: mapFavorites(state.services, payload.favorites),
    })
  )
);

const replaceServicesFilter = (val: ServicesFilter) => {
  return {
    showApis: val.showApis,
    showWebUIs: val.showWebUIs,
    showAdministratives: val.showAdministratives,
    term: val.term,
  };
};

const mapFavorites = (services: Service[], favorites: string[] | undefined): Service[] => {
  return services.map(s => ({
    ...s,
    favorite: favorites?.includes(s.prettyName) || false
  }));
};
