import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoginUsuario } from '../Core/dto/login-usuario';
import { JwtDto } from '../Core/dto/jwt-dto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  

  constructor(private httpCliente: HttpClient) { }

 
  public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
    return this.httpCliente.post<JwtDto>(this.authURL+'login',loginUsuario);
  }

  

}
