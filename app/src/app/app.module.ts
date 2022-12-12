import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import { AppEffects } from './+state/app.effects';
import { AppFacade } from './+state/app.facade';
import { appFeatureKey, reducer } from './+state/app.reducer';
import { PortalApiModule } from './apis/portal/portal-api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { PageNotFoundModule } from './pages/page-not-found/page-not-found.module';
import { StoresModule } from './pages/stores/stores.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    PortalApiModule.forRoot({ rootUrl: environment.apiUrl }),
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
          strictStateImmutability: false,
          strictActionImmutability: true,
        },
      }
    ),
    StoreModule.forFeature(appFeatureKey, reducer),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.apiUrl],
        sendAccessToken: true,
      },
    }),
    AuthModule,
    DashboardModule,
    StoresModule,
    PageNotFoundModule,
    SharedModule,
    MatSidenavModule,
  ],
  providers: [AppFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
