import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CuadroDto } from '../Core/dto/cuadro-dto';
import { ModificarCuadroDto } from '../Core/dto/modificar-cuadro-dto';
import { Cuadro } from '../Core/modelo/cuadro';

@Injectable({
  providedIn: 'root'
})
export class CuadroService {
  cuadroURL=environment.cuadroURL;
  constructor(private httpCliente: HttpClient) { }

  public listarCuadrosPorFinca(id: number): Observable<Cuadro[]>{
    return this.httpCliente.get<Cuadro[]>(this.cuadroURL +  `detalleCuadros/${id}`);
  } 

  public listarCuadros(): Observable<Cuadro[]>{
    return this.httpCliente.get<Cuadro[]>(this.cuadroURL + 'listadoCuadro');
  }

  public crearCuadro(cuadro: CuadroDto): Observable<any>{
    return this.httpCliente.post<any>(this.cuadroURL+'crearcuadro',cuadro);
  }

  public datalle(id: number): Observable<Cuadro>{
    return this.httpCliente.get<Cuadro>(this.cuadroURL + `detalle/${id}`);

  }

  public actualizarCuadro(id: number, editarCuadro: ModificarCuadroDto): Observable<any> {
    return this.httpCliente.put(this.cuadroURL + `modificarCuadro/${id}`, editarCuadro);
  }
}
