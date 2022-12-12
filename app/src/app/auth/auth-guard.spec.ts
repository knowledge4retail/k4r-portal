import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthGuard } from './auth-guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let service: AuthGuard;

  const authServiceMock = {
    isLoggedIn: () => true,
    authenticationEventObservable$: of(true),
  } as AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock }
      ],
    });
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable with true value', () => {
    expect(service.canActivate).toBeTruthy();
  });
});
