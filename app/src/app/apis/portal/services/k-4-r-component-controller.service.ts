/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { K4RComponent } from '../models/k-4-r-component';
import { K4RComponentHealth } from '../models/k-4-r-component-health';

@Injectable({
  providedIn: 'root',
})
export class K4RComponentControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllComponents
   */
  static readonly GetAllComponentsPath = '/components';

  /**
   * Lists all currently deployed K4R components.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllComponents()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllComponents$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<K4RComponent>>> {

    const rb = new RequestBuilder(this.rootUrl, K4RComponentControllerService.GetAllComponentsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<K4RComponent>>;
      })
    );
  }

  /**
   * Lists all currently deployed K4R components.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllComponents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllComponents(params?: {
    context?: HttpContext
  }
): Observable<Array<K4RComponent>> {

    return this.getAllComponents$Response(params).pipe(
      map((r: StrictHttpResponse<Array<K4RComponent>>) => r.body as Array<K4RComponent>)
    );
  }

  /**
   * Path part for operation getComponentHealth
   */
  static readonly GetComponentHealthPath = '/components/{serviceName}/health';

  /**
   * Provides health information for the given k4r component.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComponentHealth()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComponentHealth$Response(params: {
    serviceName: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<K4RComponentHealth>> {

    const rb = new RequestBuilder(this.rootUrl, K4RComponentControllerService.GetComponentHealthPath, 'get');
    if (params) {
      rb.path('serviceName', params.serviceName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<K4RComponentHealth>;
      })
    );
  }

  /**
   * Provides health information for the given k4r component.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getComponentHealth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComponentHealth(params: {
    serviceName: string;
    context?: HttpContext
  }
): Observable<K4RComponentHealth> {

    return this.getComponentHealth$Response(params).pipe(
      map((r: StrictHttpResponse<K4RComponentHealth>) => r.body as K4RComponentHealth)
    );
  }

}
