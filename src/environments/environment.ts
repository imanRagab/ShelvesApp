// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:3000/api/v1',
  api_host: 'http://localhost:3000',
  firebaseConfig: {
    apiKey: "AIzaSyCZkxlA2tCOEf9_8b-u98x9eGViHzIyWqI",
    authDomain: "shelves-53a9b.firebaseapp.com",
    databaseURL: "https://shelves-53a9b.firebaseio.com",
    projectId: "shelves-53a9b",
    storageBucket: "shelves-53a9b.appspot.com",
    messagingSenderId: "738318781916"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
