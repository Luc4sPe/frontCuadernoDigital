import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AgroquimicoDto } from '../Core/dto/agroquimico-dto';

@Injectable({
  providedIn: 'root'
})
export class AgroquimicoService {

  agroURL = environment.agroquimicoURL;

  constructor(private httpCliente: HttpClient) { }

  public crearAgroquimico(nuevAgro: AgroquimicoDto): Observable<any>{
    return this.httpCliente.post<any>(this.agroURL+'nuevoAgroquimico',nuevAgro);
  }
}
