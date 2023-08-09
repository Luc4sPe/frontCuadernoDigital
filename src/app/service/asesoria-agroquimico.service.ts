import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AsesoriaAgroquimicoDto } from '../Core/dto/asesoria-agroquimico-dto';
import { Observable } from 'rxjs';
import { AsesoriaAgroquimico } from '../Core/modelo/asesoria-agroquimico';

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

  

}
