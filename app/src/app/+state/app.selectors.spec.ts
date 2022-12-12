import { animationFrameScheduler } from 'rxjs';
import { AppNotification } from '../models/AppNotification';
import { Service } from '../models/Service';
import { UserInfo } from '../models/User';
import * as fromApp from './app.reducer';
import { selectAppState, selectIsLoggedIn, selectUser } from './app.selectors';
import { getNotifications } from './app.selectors';

describe('App Selectors', () => {
  const initialState: fromApp.AppState = {
    isLoggedIn: false,
    user: { preferred_username: 'foo' },
    services: [],
    refreshHealthStatus: false,
    servicesFilter: {
      showApis: true,
      showWebUIs: true,
      showAdministratives: true,
      term: '',
    },
    stores: [],
  };

  it('should select the initial state', () => {
    const result: fromApp.AppState = selectAppState({
      [fromApp.appFeatureKey]: initialState,
    });

    expect(result).toEqual(initialState);
  });

  it('should select the isLoggedIn state', () => {
    const result: boolean = selectIsLoggedIn({
      [fromApp.appFeatureKey]: initialState,
    });

    expect(result).toEqual(false);
  });

  it('should select the user state', () => {
    const result: UserInfo | null = selectUser({
      [fromApp.appFeatureKey]: initialState,
    });

    expect(result).toEqual({ preferred_username: 'foo' });
  });

  describe('getNotifications', () => {
    it('should return already viewed items from the localstorage', () => {
      const localstorageItems: AppNotification[] = [
        {
          text: `New version (0.0.3) for ERP-Adapter Rest available`,
          url: '1',
          viewed: true,
        },
        {
          text: `New version (v2.4.1) for DT-API Rest available`,
          url: '2',
          viewed: true,
        },
      ];
      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify(localstorageItems)
      );
      expect(getNotifications([])).toEqual(localstorageItems);
    });

    it('should return already viewed items from the localstorage and add new versions from services', () => {
      const localstorageItems: AppNotification[] = [
        {
          text: `New version (1.2.3) for ERP-Adapter Rest available`,
          url: '1',
          viewed: true,
        },
        {
          text: `New version (4.5.6) for DT-API Rest available`,
          url: '2',
          viewed: true,
        },
      ];
      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify(localstorageItems)
      );
      const services = [
        {
          prettyName: 'ERP-Adapter Rest',
          newVersion: {
            version: '1.2.4',
            url: '0',
          },
        },
      ] as Service[];
      const expected: AppNotification[] = [
        {
          text: `New version (1.2.4) for ERP-Adapter Rest available`,
          url: '0',
          viewed: false,
        },
        {
          text: `New version (1.2.3) for ERP-Adapter Rest available`,
          url: '1',
          viewed: true,
        },
        {
          text: `New version (4.5.6) for DT-API Rest available`,
          url: '2',
          viewed: true,
        },
      ];
      expect(getNotifications(services)).toEqual(expected);
    });

    it('should return already viewed items from the localstorage and add new versions from services if not alraedy in', () => {
      const localstorageItems: AppNotification[] = [
        {
          text: `New version (1.2.3) for ERP-Adapter Rest available`,
          url: '1',
          viewed: true,
        },
        {
          text: `New version (4.5.6) for DT-API Rest available`,
          url: '2',
          viewed: true,
        },
      ];
      spyOn(localStorage, 'getItem').and.returnValue(
        JSON.stringify(localstorageItems)
      );
      const services = [
        {
          prettyName: 'ERP-Adapter Rest',
          newVersion: {
            version: '1.2.3',
            url: '0',
          },
        },
        {
          prettyName: 'ERP-Adapter Rest',
          newVersion: {
            version: '1.2.4',
            url: '0',
          },
        },
      ] as Service[];
      const expected: AppNotification[] = [
        {
          text: `New version (1.2.4) for ERP-Adapter Rest available`,
          url: '0',
          viewed: false,
        },
        {
          text: `New version (1.2.3) for ERP-Adapter Rest available`,
          url: '1',
          viewed: true,
        },
        {
          text: `New version (4.5.6) for DT-API Rest available`,
          url: '2',
          viewed: true,
        },
      ];
      expect(getNotifications(services)).toEqual(expected);
    });
  });
});
