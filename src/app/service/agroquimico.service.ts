import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AgroquimicoDto } from '../Core/dto/agroquimico-dto';
import { Agroquimico } from '../Core/modelo/agroquimico';

@Injectable({
  providedIn: 'root'
})
export class AgroquimicoService {

  agroURL = environment.agroquimicoURL;

  constructor(private httpCliente: HttpClient) { }

  public crearAgroquimico(nuevAgro: AgroquimicoDto): Observable<any>{
    return this.httpCliente.post<any>(this.agroURL+'nuevoAgroquimico',nuevAgro);
  }

  public listarAgroquimico(): Observable<Agroquimico[]>{
    return this.httpCliente.get<Agroquimico[]>(this.agroURL +'listarAgroquimico');
  }

  public datalle(id: number): Observable<Agroquimico>{
    return this.httpCliente.get<Agroquimico>(this.agroURL + `detalleAgro/${id}`);

  }

  public actualizarAgroquimico(id: number, editarAgroquimico: AgroquimicoDto): Observable<any> {
    return this.httpCliente.put(this.agroURL + `update/${id}`, editarAgroquimico);
  }
}
