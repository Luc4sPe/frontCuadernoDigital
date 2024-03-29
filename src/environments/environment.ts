// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,
  
  authURL: 'http://localhost:8080/auth/',
  usuarioURL:'http://localhost:8080/usuario/',
  changePasswordURL: 'http://localhost:8080/email-password',
  riegoURL: 'http://localhost:8080/riego/',
  logsURL: 'http://localhost:8080/logs/',
  cultivoURL: 'http://localhost:8080/cultivo/',
  fincaURL: 'http://localhost:8080/finca/',
  plantacionURL:'http://localhost:8080/plantacion/',
  cuadroURL:'http://localhost:8080/cuadro/',
  laborSueloURL:'http://localhost:8080/laborSuelo/',
  agroquimicoURL:'http://localhost:8080/agroquimico/',
  aplicacionAgroquimicoURL:'http://localhost:8080/aplicacionAgroquimico/',
  asesoriaRiegoURL:'http://localhost:8080/asesoramientoRiego/',
  asesoriaAgroquimicoURL:'http://localhost:8080/asesoramientoAgroquimico/',
  

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
