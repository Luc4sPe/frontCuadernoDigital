import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../modelo/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../modelo/login-usuario';
import { JwtDto } from '../modelo/jwt-dto';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  

  constructor(private httpCliente: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.httpCliente.post<any>(this.authURL+'nuevo',nuevoUsuario);
  }
  public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
    return this.httpCliente.post<JwtDto>(this.authURL+'login',loginUsuario);
  }

  public listar(): Observable<Usuario[]>{
    return this.httpCliente.get<Usuario[]>(this.authURL + 'list');
  }

  public datail(id: number): Observable<Usuario>{
    return this.httpCliente.get<Usuario>(this.authURL + `detail/${id}`);
  }

  public update(id: number, usuario: Usuario): Observable<any> {
    return this.httpCliente.put(this.authURL + `update/${id}`, usuario);
  }
  public actu(id: number, usuario: Usuario): Observable<any>{
    return this.httpCliente.put(this.authURL + `update/${id}`, usuario )
  }

  /* getUsuarios(){
    return this.httpCliente.get<Response>(this.authURL + 'lista');
  }

  getUsuarioId(id:number){
    return this.httpCliente.get<Response>(this.authURL + "/"+ id);
  } */

}
