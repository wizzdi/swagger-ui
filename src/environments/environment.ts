// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_URL: location.origin + '/FlexiCore/rest/',
  // SWAGGER_URL: location.origin + '/FlexiCore/rest/openapi.json/',
  API_URL: 'https://dev.dtpaas.co.il' + '/FlexiCore/rest/',
  SWAGGER_URL: 'https://dev.dtpaas.co.il' + '/FlexiCore/rest/openapi.json/',
  LOGO_SRC: '../assets/logo.png',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
