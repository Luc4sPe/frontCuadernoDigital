import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogAccionService {

  constructor() { }

  public getAccionLog(): {label: string, value: string}[]{
    const acciones=[
      {label: 'Usuarios', value:'USUARIO'},
      {label: 'Accesos al sistema', value: 'USUARIO_LOGIN'},
      {label: 'Creacion Usuario', value: 'USUARIO_CREACION'},
      {label: 'Modificacion Usuario', value: 'USUARIO_MODIFICACION'},
      {label: 'Alta Usuario', value: 'USUARIO_ALTA'},
      {label: 'Baja Usuario', value: 'USUARIO_BAJA'},
      {label: 'Error acceso al sistema', value: 'USUARIO_ERROR_LOGIN'},
      {label: 'Intento login usuario inactivo', value: 'USUARIO_ERROR_LOGIN_USUARIO_INACTIVO'},
    ]
    return acciones;
  }
}
