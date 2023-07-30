import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CambioPasswordDto } from '../Core/dto/cambio-password-dto';
import { EditarUsuariosDto } from '../Core/dto/editar-usuarios-dto';
import { NuevoUsuario } from '../Core/dto/nuevo-usuario';
import { PerfilUsuarioDto } from '../Core/dto/perfil-usuario-dto';
import { Usuario } from '../Core/modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioURL = environment.usuarioURL;

  constructor(private httpCliente: HttpClient) { }


  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.httpCliente.post<any>(this.usuarioURL+'nuevo',nuevoUsuario);
  }

  public listar(): Observable<Usuario[]>{
    return this.httpCliente.get<Usuario[]>(this.usuarioURL + 'list');
  }

  public datail(id: number): Observable<Usuario>{
    return this.httpCliente.get<Usuario>(this.usuarioURL + `detail/${id}`);

  }

  public usuarioPorNombreUsuario(nombreUsuario: string):Observable<Usuario>{
    return this.httpCliente.get<Usuario>(`${this.usuarioURL}detalleNombreUsuario/${nombreUsuario}`);
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

  public cambiarPassword(id:number,cambiorPassword: CambioPasswordDto):Observable<any>{
    return this.httpCliente.put<any>(`${this.usuarioURL}cambioContrasenia/${id}`, cambiorPassword );
  }

  public actualizarPerfil(id:number, perfilUsuarioDto : PerfilUsuarioDto):Observable<any>{
    return this.httpCliente.put<any>(`${this.usuarioURL}actualizarPerfil/${id}`, perfilUsuarioDto);
  }

  public listarUsuarioPorRol(nombreRol: string): Observable<Usuario[]>{
    return this.httpCliente.get<Usuario[]>(this.usuarioURL +  `usuariosPorNombreRol/${nombreRol}`);
  } 

  public cantidadUsuarios():Observable<number> {
    return this.httpCliente.get<any>(`${this.usuarioURL}total`);
  }

  public cantidadUsuariosActivos():Observable<number> {
    return this.httpCliente.get<any>(`${this.usuarioURL}total-usuarioActivos`);

  }

  public cantidadUsuarioInactivos():Observable<number> {
    return this.httpCliente.get<any>(`${this.usuarioURL}total-usuarioInactivos`);

  }


}
