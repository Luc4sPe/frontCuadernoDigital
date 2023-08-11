import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AsesoriaAgroquimicoDto } from '../Core/dto/asesoria-agroquimico-dto';
import { Observable } from 'rxjs';
import { AsesoriaAgroquimico } from '../Core/modelo/asesoria-agroquimico';
import { ModificarAgroquimicoDto } from '../Core/dto/modificar-agroquimico-dto';
import { ModificarAsesoriaAgroquimicoDto } from '../Core/dto/modificar-asesoria-agroquimico-dto';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaAgroquimicoService {
  

  asesoriaAgroquiURL = environment.asesoriaAgroquimicoURL;


  constructor(private httpCliente: HttpClient) { }


  public crearAsesoriaAgroquimico(asesoria: AsesoriaAgroquimicoDto): Observable<any>{
    return this.httpCliente.post<any>(this.asesoriaAgroquiURL+'nuevoAsesoriaAgroquimico',asesoria);
  }

  public listarAsesoria(): Observable<AsesoriaAgroquimico[]>{
    return this.httpCliente.get<AsesoriaAgroquimico[]>(this.asesoriaAgroquiURL +'listaAsesoriaAgroquimico');
  }

  public listarAsesoriaPorFinca(idFinca:number): Observable<AsesoriaAgroquimico[]>{
    return this.httpCliente.get<AsesoriaAgroquimico[]>(this.asesoriaAgroquiURL +`listadoAsesoriaAgroDeUnaFinca/${idFinca}`);
  }

  public cantidadAsesoriaAgro():Observable<number> {
    return this.httpCliente.get<any>(`${this.asesoriaAgroquiURL}total`);
  }

  public cantidadAsesoriaAgroAplicada():Observable<number> {
    return this.httpCliente.get<any>(`${this.asesoriaAgroquiURL}total-Aplicados`);

  }


  public cantidadAsesoriaAgroNoAplicada():Observable<number> {
    return this.httpCliente.get<any>(`${this.asesoriaAgroquiURL}total-NoAplicados`);

  }

  public obtenerAsesoria(id: number): Observable<AsesoriaAgroquimico>{
    return this.httpCliente.get<AsesoriaAgroquimico>(this.asesoriaAgroquiURL + `detalle/${id}`);

  }

  public modificarAsesoriaAgro(id: number, modificar: ModificarAsesoriaAgroquimicoDto): Observable<any> {
    return this.httpCliente.put(this.asesoriaAgroquiURL + `update/${id}`, modificar);
  }


  public seAplico(id:number):Observable<any>{
    return this.httpCliente.put<any>(this.asesoriaAgroquiURL+ `aplico/${id}`,id);
  }




  

}
