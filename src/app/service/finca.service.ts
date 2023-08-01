import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FincaDto } from '../Core/dto/finca-dto';
import { ModificarCultivoDto } from '../Core/dto/modificar-cultivo-dto';
import { ModificarFincaDto } from '../Core/dto/modificar-finca-dto';
import { Finca } from '../Core/modelo/finca';


@Injectable({
  providedIn: 'root'
})
export class FincaService {

  fincaURL = environment.fincaURL;
  constructor(private httpCliente: HttpClient) { }

  public crearFinca(finca: FincaDto): Observable<any>{
    return this.httpCliente.post<any>(this.fincaURL+'crearFinca',finca);
  }

  public listar(): Observable<Finca[]>{
    return this.httpCliente.get<Finca[]>(this.fincaURL + 'listadoFinca');
  }

  public listarFincaPorUsuario(nombreUsuario: string): Observable<Finca[]>{
    return this.httpCliente.get<Finca[]>(this.fincaURL +  `fincaPorNombreUsuario/${nombreUsuario}`);
  } 

  public datalle(id: number): Observable<Finca>{
    return this.httpCliente.get<Finca>(this.fincaURL + `detalle/${id}`);

  }

  public actualizarFinca(id: number, editarFinca: ModificarFincaDto): Observable<any> {
    return this.httpCliente.put(this.fincaURL + `modificar/${id}`, editarFinca);
  }

  public cantidadFincas():Observable<number> {
    return this.httpCliente.get<any>(`${this.fincaURL}CantidadDeFinca`);
  }

  
}
