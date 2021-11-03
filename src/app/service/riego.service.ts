import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditarRiego } from '../dto/editar-riego';
import { RiegoDto } from '../dto/riego-dto';
import { Riego } from '../modelo/riego';

@Injectable({
  providedIn: 'root'
})
export class RiegoService {

  riegoURL = environment.riegoURL;
    


  constructor(private httpCliente: HttpClient) { }

  public listar(): Observable<Riego[]>{
    return this.httpCliente.get<Riego[]>(this.riegoURL + 'lista');
  }

  public nuevo(nuevoRiego: RiegoDto): Observable<any>{
    return this.httpCliente.post<any>(this.riegoURL+'nuevoRiego',nuevoRiego);
  }

  public datalle(id: number): Observable<Riego>{
    return this.httpCliente.get<Riego>(this.riegoURL + `detalle/${id}`);

  }

  public actualizarRiego(id: number, editarRiego: EditarRiego ): Observable<any> {
    return this.httpCliente.put<any>(this.riegoURL + `update/${id}`, editarRiego);
  }

  
  


}
