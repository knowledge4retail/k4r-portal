/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'https://portalbackend.sandbox.knowledge4retail.org';
}

/**
 * Parameters for `PortalApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
