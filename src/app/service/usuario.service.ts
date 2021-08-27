import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioURL = 'http://localhost:8080/auth/';

  constructor(private httpCliente: HttpClient) { }

  public listar(): Observable<Usuario[]>{
    return this.httpCliente.get<Usuario[]>(this.usuarioURL + 'list');
  }

  public datail(id: number): Observable<Usuario>{
    return this.httpCliente.get<Usuario>(this.usuarioURL + `detail/${id}`);

  }

  public update(id: number, usuario: Usuario): Observable<any> {
    return this.httpCliente.put(this.usuarioURL + `update/${id}`, usuario);
  }


}
