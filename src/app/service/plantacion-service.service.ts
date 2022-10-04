import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlantacionDto } from '../Core/dto/plantacion-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantacionServiceService {

  plantacionURL=environment.plantacionURL;  
  constructor(private httpCliente: HttpClient) { }

  public crearPlantacion(plantacion: PlantacionDto): Observable<any>{
    return this.httpCliente.post<any>(this.plantacionURL+'crearPlantacion',plantacion);
  }
}
