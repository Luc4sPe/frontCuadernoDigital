import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditarRiego } from '../Core/dto/editar-riego';
import { RiegoDto } from '../Core/dto/riego-dto';
import { Riego } from '../Core/modelo/riego';

@Injectable({
  providedIn: 'root'
})
export class RiegoService {

  riegoURL = environment.riegoURL;
    


  constructor(private httpCliente: HttpClient) { }

  public listar(): Observable<Riego[]>{
    return this.httpCliente.get<Riego[]>(this.riegoURL + 'lista');
  }

   public listarRiegoPorUsuario(nombreUsuario: string): Observable<Riego[]>{
    return this.httpCliente.get<Riego[]>(this.riegoURL +  `riegoPorNombreUsuario/${nombreUsuario}`);
  } 

   public listadoRiegoDeUnUsuarioID(idUsuario: number): Observable<Riego[]>{
    return this.httpCliente.get<Riego[]>(this.riegoURL +  `riegoPorUsuario/${idUsuario}`);
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
