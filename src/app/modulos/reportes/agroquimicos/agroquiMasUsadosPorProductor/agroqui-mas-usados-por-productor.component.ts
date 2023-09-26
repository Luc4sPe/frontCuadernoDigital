import { Component } from '@angular/core';
import { AplicacionAgroquimico } from 'src/app/Core/modelo/aplicacion-agroquimico';
import { AplicacionAgroquimicoService } from 'src/app/service/aplicacion-agroquimico.service';
import { FechaDesdeHastaService } from 'src/app/service/fecha-desde-hasta-service';
import { ChartService } from 'src/app/service/chart.service';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-agroqui-mas-usados-por-productor',
  templateUrl: './agroqui-mas-usados-por-productor.component.html',
  styleUrls: ['./agroqui-mas-usados-por-productor.component.css']
})
export class AgroquiMasUsadosPorProductorComponent {

  apliAgroquimico : AplicacionAgroquimico [] = []; 
  rangoFechas : Date[] = [new Date(), new Date()];
  userName : string = '';
  loading : boolean = true;
  acciones : any;
  data: any;
  options : any;
  tituloTabla : string = 'Listado';
  tituloGrafico : string = 'Agroquimico más utilizado por finca';
  subtituloGrafico : string = 'Grafico de Área polar , debes ingresar el nombre de usuario ';



  constructor(
    private fechaDesdeHastaService : FechaDesdeHastaService,
    private chartService: ChartService,
    private aplicacionAgroService: AplicacionAgroquimicoService
    
  ) { }

  cargarAgroquiAplicaPorProductor(): void {
    
    this.aplicacionAgroService.listadoAplicacionAgroPorNombreProductor(this.userName).toPromise().then(
      data => {
        this.tituloTabla = `Agroquímicos usados por: ${this.userName}`;
        
        this.apliAgroquimico =data;
        this.apliAgroquimico.forEach(agro => {new Date(agro.fechaDeAplicacion)}) 
        
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
    this.aplicacionAgroService.listadoAplicacionAgroPorNombreProductor(this.userName).toPromise().then(
    
      data => {
        this.tituloGrafico = `Agroquímicos utilizados por el productor ${this.userName}`;
        this.subtituloGrafico = `Desde ${fechaDesde.toLocaleDateString()} hasta ${fechaHasta.toLocaleDateString()}.`
        this.apliAgroquimico = data.filter(agro => new Date(agro.fechaDeAplicacion) >= fechaDesde && new Date(agro.fechaDeAplicacion) <= fechaHasta);                            
        this.loading = false;
        this.cargarGrafico();
      },err => {
        Swal.fire('Error, nombre de usuario incorrecto ', err.error.message, 'error')
      }
    )
  }

  cargarGrafico(): void{
    let cantidadAcciones : number = 0;
    //creo un objeto que tendra accionLog:veces que aparece
    let accionTimes : {[key: string]: number} = {}
    const acciones : string[] = this.apliAgroquimico.map(agro => agro.agroquimico.nombreComercial);
    acciones.forEach(accion => {
      accionTimes[accion] = !accionTimes[accion] ? 1 : accionTimes[accion] + 1;
    })
    //obtengo las claves y values, aqui no hace falta ordenarlo
    const labels =Object.keys(accionTimes);
    const datos = Object.values(accionTimes);
    //genero el chart desde el servicio
    this.data = this.chartService.formatearPolarArea(labels, datos);
    datos.forEach(accion => cantidadAcciones +=accion);
    this.subtituloGrafico = this.subtituloGrafico + ` En total ${cantidadAcciones.toString()} aplicaciones`;
   
  }

 
  clear(table : Table) {
    table.clear();
  }




}
