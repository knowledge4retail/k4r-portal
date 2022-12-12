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
