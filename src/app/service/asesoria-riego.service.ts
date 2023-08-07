import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AsesoriaRiegoDto } from '../Core/dto/asesoria-riego-dto';
import { Observable } from 'rxjs';
import { ModificarAsesoRiego } from '../Core/dto/modificar-aseso-riego';
import { AsesoriaRiego } from '../Core/modelo/asesoria-riego';


@Injectable({
  providedIn: 'root'
})
export class AsesoriaRiegoService {

  aseRiegoURL = environment.asesoriaRiegoURL; 


  constructor(private httpCliente: HttpClient) { }

  public crearAsesoriaRiego(asesoria: AsesoriaRiegoDto): Observable<any>{
    return this.httpCliente.post<any>(this.aseRiegoURL+'nuevaAsesoria',asesoria);
  }

  public modificarAsesoriaRiego(id: number, modificar: ModificarAsesoRiego): Observable<any> {
    return this.httpCliente.put(this.aseRiegoURL + `editarAsesoriaRiego/${id}`, modificar);
  }

  public listarAsesoria(): Observable<AsesoriaRiego[]>{
    return this.httpCliente.get<AsesoriaRiego[]>(this.aseRiegoURL +'listaAsesoria');
  }

  public listarAsesoriaPorFinca(idFinca:number): Observable<AsesoriaRiego[]>{
    return this.httpCliente.get<AsesoriaRiego[]>(this.aseRiegoURL +`listadoAsesoriaRiegoDeUnaFinca/${idFinca}`);
  }

  
  public obtenerAsesoria(id: number): Observable<AsesoriaRiego>{
    return this.httpCliente.get<AsesoriaRiego>(this.aseRiegoURL + `detalle/${id}`);

  }

  public seAplico(id:number):Observable<any>{
    return this.httpCliente.put<any>(this.aseRiegoURL+ `aplico/${id}`,id);
  }

  public cancelarAplicacion(id:number):Observable<any>{
    return this.httpCliente.put<any>(this.aseRiegoURL + `canceloAplica/${id}`,id);
  }

  public cantidadAsesoriaRiego():Observable<number> {
    return this.httpCliente.get<any>(`${this.aseRiegoURL}total`);
  }

  public cantidadAsesoriaRiegoAplicada():Observable<number> {
    return this.httpCliente.get<any>(`${this.aseRiegoURL}total-Aplicados`);

  }

  public cantidadAsesoriaRiegoNoAplicada():Observable<number> {
    return this.httpCliente.get<any>(`${this.aseRiegoURL}total-NoAplicados`);

  }

  public cantidadAsesoriaRiegoByProductor(nombre: string):Observable<number> {
    return this.httpCliente.get<any>(`${this.aseRiegoURL}total-asesoriaByProductor/${nombre}`);
  }
  
  
}
