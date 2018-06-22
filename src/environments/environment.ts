// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  angularCLIVersion: require('../../package-lock.json').dependencies['@angular/cli'].version,
  emojiDomain: 'https://xn--sn8h24a.ml',
  standardDomain: 'https://tanb.app',
  apiServer: 'https://api.tanb.app'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
