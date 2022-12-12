/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { K4RStoreControllerService } from './services/k-4-r-store-controller.service';
import { K4RComponentControllerService } from './services/k-4-r-component-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    K4RStoreControllerService,
    K4RComponentControllerService,
    ApiConfiguration
  ],
})
export class PortalApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<PortalApiModule> {
    return {
      ngModule: PortalApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: PortalApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('PortalApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
