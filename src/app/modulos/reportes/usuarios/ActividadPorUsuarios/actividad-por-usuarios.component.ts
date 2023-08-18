import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/Core/modelo/log';
import { ChartService } from 'src/app/service/chart.service';
import { FechaDesdeHastaService } from 'src/app/service/fecha-desde-hasta-service';
import { LogAccionService } from 'src/app/service/log-accion.service';
import { LogService } from 'src/app/service/log.service';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-actividad-por-usuarios',
  templateUrl: './actividad-por-usuarios.component.html',
  styleUrls: ['./actividad-por-usuarios.component.css']
})
export class ActividadPorUsuariosComponent implements OnInit {

  logsDeUsuario: Log[] = [];
  rangoFechas : Date[] = [new Date(), new Date()];
  userName : string = '';
  loading : boolean = true;
  acciones : any;
  data: any;
  options : any;
  tituloTabla : string = 'Listado';
  tituloGrafico : string = 'Actividad';
  subtituloGrafico : string = 'Grafico de torta, debes ingresar el usuario';

  constructor(
    private logService: LogService,
    private fechaDesdeHastaService : FechaDesdeHastaService,
    private chartService: ChartService,
    private logAccionService: LogAccionService,
  ) { }

  ngOnInit(): void {
  }

  cargarLogsDeUsuario(): void {
    this.logService.ListadoLogsPorNombreUsuario(this.userName).toPromise().then(
      data => {
        this.tituloTabla = `Actividad del usuario: ${this.userName}`;
        this.logsDeUsuario = data;
        this.logsDeUsuario.forEach(log => { new Date(log.fecha)});
        this.loading = false;
      },
      err => {
        Swal.fire('Error', err.error.message, 'error')
      }
    )
  }

  cargarDatosfiltrados():void{
    const fechas : Date[] = this.fechaDesdeHastaService.getFechaDesdeHasta(this.rangoFechas[0], this.rangoFechas[1]);
    const fechaDesde : Date = fechas[0];
    const fechaHasta : Date = fechas[1];
    this.logService.ListadoLogsPorNombreUsuario(this.userName).toPromise().then(
      data => {
        this.tituloGrafico = `Actividad de ${this.userName}`;
        this.subtituloGrafico = `Desde ${fechaDesde.toLocaleDateString()} hasta ${fechaHasta.toLocaleDateString()}.`
        this.logsDeUsuario = data.filter(log => new Date(log.fecha) >= fechaDesde && new Date(log.fecha) <= fechaHasta);                            
        this.loading = false;
        this.cargarGrafico();
      },err => {
        Swal.fire('Error', err.error.message, 'error')
      }
    )
  }

  cargarGrafico(): void{
    let cantidadAcciones : number = 0;
    //creo un objeto que tendra accionLog:veces que aparece
    let accionTimes : {[key: string]: number} = {}
    const acciones : string[] = this.logsDeUsuario.map(log => log.logAccion);
    acciones.forEach(accion => {
      accionTimes[accion] = !accionTimes[accion] ? 1 : accionTimes[accion] + 1;
    })
    //obtengo las claves y values, aqui no hace falta ordenarlo
    const labels =Object.keys(accionTimes);
    const datos = Object.values(accionTimes);
    //genero el chart desde el servicio
    this.data = this.chartService.formatearPieChart(labels, datos);
    datos.forEach(accion => cantidadAcciones +=accion);
    this.subtituloGrafico = this.subtituloGrafico + ` En total ${cantidadAcciones.toString()} acciones`;
   
  }

  clear(table : Table) {
    table.clear();
  }

  cargarAcciones():void{
    this.acciones = this.logAccionService.getAccionLog();
  }



}
