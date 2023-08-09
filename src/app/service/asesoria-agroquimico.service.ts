import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AsesoriaAgroquimicoDto } from '../Core/dto/asesoria-agroquimico-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaAgroquimicoService {
  

  asesoriaAgroquiURL = environment.asesoriaAgroquimicoURL;


  constructor(private httpCliente: HttpClient) { }


  public crearAsesoriaAgroquimico(asesoria: AsesoriaAgroquimicoDto): Observable<any>{
    return this.httpCliente.post<any>(this.asesoriaAgroquiURL+'nuevoAsesoriaAgroquimico',asesoria);
  }

  

}
