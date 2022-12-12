import { createFeatureSelector, createSelector } from '@ngrx/store';
import { K4RComponentType } from '../apis/portal/models';
import { AppNotification } from '../models/AppNotification';
import { Service } from '../models/Service';
import { ServicesFilter } from '../models/ServicesFilter';
import { SortedServices } from '../models/SortedServices';
import * as fromApp from './app.reducer';

export const selectAppState = createFeatureSelector<fromApp.AppState>(
  fromApp.appFeatureKey
);

export const selectIsLoggedIn = createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.isLoggedIn
);

export const selectUser = createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.user
);

export const selectNotifications = createSelector(
  selectAppState,
  (state: fromApp.AppState) => getNotifications(state.services)
);

export const selectServices = createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.services
);

export const selectServicesFilter = createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.servicesFilter
);

export const selectFilteredServices = createSelector(
  selectAppState,
  (state: fromApp.AppState) =>
    getFilteredAndSortedServices(state.services, state.servicesFilter)
);

export const selectFavorites = createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.services.filter((s) => s.favorite)
);

export const selectRefreshHealthStatus = createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.refreshHealthStatus
);

export const selectStores = createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.stores
);

const getFilteredAndSortedServices = (
  services: Service[],
  filters: ServicesFilter
): SortedServices => {
  services = !filters.showApis
    ? services.filter((s) => s.type !== K4RComponentType.Api)
    : services;
  services = !filters.showWebUIs
    ? services.filter((s) => s.type !== K4RComponentType.Webui)
    : services;
  services = !filters.showAdministratives
    ? services.filter((s) => s.type !== K4RComponentType.Administrative)
    : services;
  services = filters.term
    ? services.filter(
        (s) =>
          s.prettyName.toLowerCase().includes(filters.term.toLowerCase()) ||
          s.description.toLowerCase().includes(filters.term.toLowerCase())
      )
    : services;
  return getSortedServices([...services]);
};

const getSortedServices = (services: Service[]): SortedServices => {
  const apis: Service[] = services
    .filter((s) => s.type === K4RComponentType.Api)
    .sort((a, b) => a.prettyName.localeCompare(b.prettyName));
  const webUIs: Service[] = services
    .filter((s) => s.type === K4RComponentType.Webui)
    .sort((a, b) => a.prettyName.localeCompare(b.prettyName));
  const administratives: Service[] = services
    .filter((s) => s.type === K4RComponentType.Administrative)
    .sort((a, b) => a.prettyName.localeCompare(b.prettyName));
  return { apis, webUIs, administration: administratives };
};

export const getNotifications = (services: Service[]): AppNotification[] => {
  const viewedNewVersions: string | null = localStorage.getItem(
    fromApp.newVersionsToken
  );
  let parsedViewedNewVersions: AppNotification[] = viewedNewVersions
    ? JSON.parse(viewedNewVersions)
    : [];
  if (services && services.length > 0) {
    const serviceCopy: Service[] = JSON.parse(
      JSON.stringify(services)
    ) as typeof services;
    serviceCopy
      .filter((s) => s.newVersion)
      .map((s) => ({
        text: `New version (${s.newVersion?.version}) for ${s.prettyName} available`,
        url: s.newVersion?.url,
        viewed: false,
      }))
      .forEach((n: AppNotification) => {
        if (!parsedViewedNewVersions.find((pvnv) => pvnv.text === n.text)) {
          parsedViewedNewVersions.unshift(n);
        }
      });
  }

  return parsedViewedNewVersions;
};
