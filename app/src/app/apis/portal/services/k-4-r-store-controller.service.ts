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

import { K4RStore } from '../models/k-4-r-store';

@Injectable({
  providedIn: 'root',
})
export class K4RStoreControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllStores
   */
  static readonly GetAllStoresPath = '/stores/aggregates';

  /**
   * Lists all K4R Store including aggregate object count metadata
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllStores()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStores$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<K4RStore>>> {

    const rb = new RequestBuilder(this.rootUrl, K4RStoreControllerService.GetAllStoresPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<K4RStore>>;
      })
    );
  }

  /**
   * Lists all K4R Store including aggregate object count metadata
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllStores$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStores(params?: {
    context?: HttpContext
  }
): Observable<Array<K4RStore>> {

    return this.getAllStores$Response(params).pipe(
      map((r: StrictHttpResponse<Array<K4RStore>>) => r.body as Array<K4RStore>)
    );
  }

}
