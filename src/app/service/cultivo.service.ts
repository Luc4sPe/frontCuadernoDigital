import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductorDto } from '../Core/dto/productor-dto';
import { Observable } from 'rxjs';
import { Usuario } from '../Core/modelo/usuario';
import { FincaDto } from '../Core/dto/finca-dto';



@Injectable({
  providedIn: 'root'
})
export class CultivoService {

  cultivoURL = environment.cultivoURL;
  
  
  constructor(private httpCliente: HttpClient) { }

  public crearProductor(nuevProductor: ProductorDto): Observable<any>{
    return this.httpCliente.post<any>(this.cultivoURL+'nuevo',nuevProductor);
  }

  public listarUsuarioPorRol(nombreRol: string): Observable<Usuario[]>{
    return this.httpCliente.get<Usuario[]>(this.cultivoURL +  `usuariosPorNombreRol/${nombreRol}`);
  } 

  
}
