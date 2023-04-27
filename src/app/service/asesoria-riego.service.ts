import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AsesoriaRiegoDto } from '../Core/dto/asesoria-riego-dto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AsesoriaRiegoService {

  aseRiegoURL = environment.asesoriaRiegoURL; 


  constructor(private httpCliente: HttpClient) { }

  public crearAsesoriaRiego(asesoria: AsesoriaRiegoDto): Observable<any>{
    return this.httpCliente.post<any>(this.aseRiegoURL+'nuevaAsesoria',asesoria);
  }

  
}
