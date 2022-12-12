import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { of } from 'rxjs';
import { AppFacade } from '../+state/app.facade';
import { UserInfo } from '../models/User';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const fakeUserProfile: UserInfo = {
    preferred_username: 'foo',
  };

  const oAuthServiceMock = {
    configure: () => {},
    loadDiscoveryDocumentAndLogin: () =>
      new Promise((resolve, reject) => resolve(true)),
    loadUserProfile: () =>
      new Promise((resolve, reject) => resolve(fakeUserProfile)),
    revokeTokenAndLogout: () => {},
    setupAutomaticSilentRefresh: () => {},
    hasValidAccessToken: () => true,
    hasValidIdToken: () => true,
  } as unknown as OAuthService;
  const appFacadeMock = {
    setIsLoggedIn: () => {},
  } as unknown as AppFacade;
  const routerMock = {
    navigate: () => {},
    events: of(),
  } as unknown as Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: OAuthService, useValue: oAuthServiceMock },
        { provide: AppFacade, useValue: appFacadeMock },
        { provide: Router, useValue: routerMock },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should init the login process', (done: DoneFn) => {
      spyOn(oAuthServiceMock, 'setupAutomaticSilentRefresh');
      service.init();
      service.authenticationEventObservable$.subscribe((val) => {
        expect(val).toBeTruthy();
        done();
      });
      expect(
        oAuthServiceMock.setupAutomaticSilentRefresh
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('loadUser', () => {
    it('should return a user profile', (done: DoneFn) => {
      service.loadUser().subscribe((res) => {
        expect(res).toEqual(fakeUserProfile);
        done();
      });
    });
  });

  describe('logOut', () => {
    it('should call OAuthService revokeTokenAndLogout', () => {
      spyOn(oAuthServiceMock, 'revokeTokenAndLogout');
      service.logOut();
      expect(oAuthServiceMock.revokeTokenAndLogout).toHaveBeenCalled();
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if OAuthService has valid tokens', () => {
      expect(service.isLoggedIn()).toBeTruthy();
    });
  });
});
