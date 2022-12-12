import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): Observable<boolean> {
    if (this.authService.isLoggedIn()) {
      return of(true);
    } else {
      return this.authService.authenticationEventObservable$;
    }
  }
}
