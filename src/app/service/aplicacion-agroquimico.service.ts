import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AplicacionAgroquimicoDto } from '../Core/dto/aplicacion-agroquimico-dto';
import { AplicacionAgroquimico } from '../Core/modelo/aplicacion-agroquimico';
import { EditarAplicacionAgroDto } from '../Core/dto/editar-aplicacion-agro-dto';

@Injectable({
  providedIn: 'root'
})
export class AplicacionAgroquimicoService {

  
  AplicacionAgroURL = environment.aplicacionAgroquimicoURL;
  
  constructor(private httpCliente: HttpClient) { }

  public crearAplicacionAgro(aplicacionAgro: AplicacionAgroquimicoDto): Observable<any>{
    return this.httpCliente.post<any>(this.AplicacionAgroURL+'nuevoApliAgroquimico',aplicacionAgro);
  }

  public listarAplicacionAgroPorFinca(idFinca: number): Observable<AplicacionAgroquimico[]>{
    return this.httpCliente.get<[AplicacionAgroquimico]>(this.AplicacionAgroURL+`listadoAplicacionAgroDeUnaFinca/${idFinca}`);
  } 

  public listarAplicacionAgroquimico(): Observable<AplicacionAgroquimico[]>{
    return this.httpCliente.get<AplicacionAgroquimico[]>(this.AplicacionAgroURL +'listarAplicacionAgroquimico');
  }

  public datalle(id: number): Observable<AplicacionAgroquimico>{
    return this.httpCliente.get<AplicacionAgroquimico>(this.AplicacionAgroURL + `detalleAplicacionAgro/${id}`);

  }

  public actualizarAplicacionAgro(id: number, editarAplicacion: EditarAplicacionAgroDto ): Observable<any> {
    return this.httpCliente.put<any>(this.AplicacionAgroURL + `update/${id}`, editarAplicacion);
  }

 
}
