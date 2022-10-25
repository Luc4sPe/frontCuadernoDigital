import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LaborSueloDto } from '../Core/dto/labor-suelo-dto';
@Injectable({
  providedIn: 'root'
})
export class LaborSueloService {

  laborSueloURL = environment.laborSueloURL
  constructor(private httpCliente: HttpClient) { }

  public crearLabor(labor: LaborSueloDto): Observable<any>{
    return this.httpCliente.post<any>(this.laborSueloURL+'crearLabor',labor);
  }
}
