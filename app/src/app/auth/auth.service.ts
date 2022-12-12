import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter, from, Observable, Subject } from 'rxjs';
import { AppFacade } from '../+state/app.facade';
import { authCodeFlowConfig } from './auth-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUrl = '/';

  constructor(
    private oauthService: OAuthService,
    private appFacade: AppFacade,
    private router: Router
  ) {
    this.oauthService.configure(authCodeFlowConfig);

    // set redirect uri via localstorage
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => localStorage.setItem('currentUrl', e.url));
  }

  authenticationEventSubject: Subject<boolean> = new Subject<boolean>();
  public authenticationEventObservable$: Observable<boolean> =
    this.authenticationEventSubject.asObservable();

  init() {
    this.oauthService
      .loadDiscoveryDocumentAndLogin()
      .then((result: boolean) => {
        localStorage.getItem('currentUrl') &&
          this.router.navigate([localStorage.getItem('currentUrl')]);
        this.authenticationEventSubject.next(result);
        this.appFacade.setIsLoggedIn(result);
      });

    this.oauthService.setupAutomaticSilentRefresh();
  }

  // if loading user fails, re-init login process
  loadUser(): Observable<any> {
    return from(this.oauthService.loadUserProfile().catch((_) => this.init()));
  }

  logOut(): void {
    this.oauthService.revokeTokenAndLogout();
  }

  isLoggedIn(): boolean {
    return (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    );
  }
}
