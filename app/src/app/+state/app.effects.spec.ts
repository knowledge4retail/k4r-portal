import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { K4RComponentControllerService, K4RStoreControllerService } from '../apis/portal/services';
import { AuthService } from '../auth/auth.service';
import { ServiceCardsService } from '../shared/service-cards/service-cards.service';

import { AppEffects } from './app.effects';
import { AppFacade } from './app.facade';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;

  const authServiceMock = {
    isLoggedIn: () => true,
    authenticationEventObservable$: of(true),
  } as AuthService;

  const k4RComponentControllerServiceMock = {} as unknown as K4RComponentControllerService;
  const k4RStoreControllerServiceMock = {} as unknown as K4RStoreControllerService;
  const serviceCardsServiceMock = {} as unknown as ServiceCardsService;
  const appFacadeMock = {} as AppFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: authServiceMock },
        { provide: K4RComponentControllerService, useValue: k4RComponentControllerServiceMock },
        { provide: K4RStoreControllerService, useValue: k4RStoreControllerServiceMock },
        { provide: ServiceCardsService, useValue: serviceCardsServiceMock },
        { provide: AppFacade, useValue: appFacadeMock }
      ]
    });

    effects = TestBed.inject(AppEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
