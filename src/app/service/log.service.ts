import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Log } from '../modelo/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logsURL = environment.logsURL;

  constructor(private httpCliente: HttpClient) { }

  public listadoLogs():Observable<Log[]>{
    return this.httpCliente.get<Log[]>(`${this.logsURL}/listado`);
  }

  public listadoLogsPorUsuarios(idUsuario: Number):Observable<Log[]>{
    return this.httpCliente.get<Log[]>(`${this.logsURL}/actividadUsuario/${idUsuario}`);
  }

  public ListadoLogsPorNombreUsuario(nombreUsuario: string):Observable<Log[]>{
    return this.httpCliente.get<Log[]>(`${this.logsURL}/actividad/${nombreUsuario}`);
  }
}
