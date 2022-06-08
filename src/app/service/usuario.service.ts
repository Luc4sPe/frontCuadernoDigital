import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditarUsuariosDto } from '../dto/editar-usuarios-dto';
import { Usuario } from '../dto/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioURL = 'http://localhost:8080/usuario/';

  constructor(private httpCliente: HttpClient) { }

  public listar(): Observable<Usuario[]>{
    return this.httpCliente.get<Usuario[]>(this.usuarioURL + 'list');
  }

  public datail(id: number): Observable<Usuario>{
    return this.httpCliente.get<Usuario>(this.usuarioURL + `detail/${id}`);

  }

  public update(id: number, editarUsuario: EditarUsuariosDto): Observable<any> {
    return this.httpCliente.put(this.usuarioURL + `update/${id}`, editarUsuario);
  }

  public altaUsuario(id:number):Observable<any>{
    return this.httpCliente.put<any>(this.usuarioURL+ `alta/${id}`,id);
  }

  public bajaUsuario(id:number):Observable<any>{
    return this.httpCliente.put<any>(this.usuarioURL + `baja/${id}`,id);
  }

}
