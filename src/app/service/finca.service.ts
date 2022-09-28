import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FincaDto } from '../Core/dto/finca-dto';
import { Cuadro } from '../Core/modelo/cuadro';
import { Usuario } from '../Core/modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class FincaService {

  fincaURL = environment.fincaURL;
  constructor(private httpCliente: HttpClient) { }

  public crearFinca(finca: FincaDto): Observable<any>{
    return this.httpCliente.post<any>(this.fincaURL+'crearFinca',finca);
  }

  public listar(): Observable<Cuadro[]>{
    return this.httpCliente.get<Cuadro[]>(this.fincaURL + 'listadoCuadro');
  }

  
}
