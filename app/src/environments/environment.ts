// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// @ts-nocheck

export const environment = {
  production: false,
  apiUrl:
    window && window['env'] && window['env']['apiUrl']
      ? window['env']['apiUrl']
      : 'https://portalbackend.sandbox.knowledge4retail.org',
  auth_issuer:
    window && window['env'] && window['env']['auth_issuer']
      ? window['env']['auth_issuer']
      : 'https://auth.sandbox.knowledge4retail.org/auth/realms/k4r',
  auth_clientId:
    window && window['env'] ? window['env']['auth_clientId'] : 'k4r-test',
  storevizUrl:
    window && window['env'] && window['env']['storevizUrl']
      ? window['env']['storevizUrl']
      : 'https://storeviz.sandbox.knowledge4retail.org/?store=',
  dtSchemaPath:
    window && window['env'] && window['env']['dtSchemaPath']
      ? window['env']['dtSchemaPath']
      : `${window.location.origin}/assets/dtschema/index.html`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
