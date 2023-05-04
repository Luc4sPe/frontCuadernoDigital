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

  
  
}
