import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlantacionDto } from '../Core/dto/plantacion-dto';

@Injectable({
  providedIn: 'root'
})
export class PlantacionService {

  plantacionURL=environment.plantacionURL;  
  constructor(private httpCliente: HttpClient) { }

  public crearPlantacion(plantacion: PlantacionDto): Observable<any>{
    return this.httpCliente.post<any>(this.plantacionURL+'crearPlantacion',plantacion);
  }

}
