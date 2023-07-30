import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductorDto } from '../Core/dto/productor-dto';
import { Observable } from 'rxjs';
import { Usuario } from '../Core/modelo/usuario';
import { FincaDto } from '../Core/dto/finca-dto';
import { CultivoDto } from '../Core/dto/cultivo-dto';
import { Cultivo } from '../Core/modelo/cultivo';



@Injectable({
  providedIn: 'root'
})
export class CultivoService {

  cultivoURL = environment.cultivoURL;
  
  
  constructor(private httpCliente: HttpClient) { }

  public crearProductor(nuevProductor: ProductorDto): Observable<any>{
    return this.httpCliente.post<any>(this.cultivoURL+'nuevo',nuevProductor);
  }

  public crearCultivo(nuevCultivo: CultivoDto): Observable<any>{
    return this.httpCliente.post<any>(this.cultivoURL+'crearCultivo',nuevCultivo);
  }

  public listarUsuarioPorRol(nombreRol: string): Observable<Usuario[]>{
    return this.httpCliente.get<Usuario[]>(this.cultivoURL +  `usuariosPorNombreRol/${nombreRol}`);
  } 

  public listarCultivo(): Observable<Cultivo[]>{
    return this.httpCliente.get<Cultivo[]>(this.cultivoURL +'listado');
  }

  public datalle(id: number): Observable<Cultivo>{
    return this.httpCliente.get<Cultivo>(this.cultivoURL + `detalle/${id}`);

  }

  public actualizarCultivo(id: number, editarCultivo: CultivoDto): Observable<any> {
    return this.httpCliente.put(this.cultivoURL + `modificar/${id}`, editarCultivo);
  }

  public cantidadCultivos():Observable<number> {
    return this.httpCliente.get<any>(`${this.cultivoURL}total`);
  }

  
}
