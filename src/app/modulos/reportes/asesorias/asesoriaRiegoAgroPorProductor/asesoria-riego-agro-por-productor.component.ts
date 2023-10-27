import { Component, OnInit } from '@angular/core';
import { AsesoriaAgroquimico } from 'src/app/Core/modelo/asesoria-agroquimico';
import { AsesoriaRiego } from 'src/app/Core/modelo/asesoria-riego';
import { AsesoriaAgroquimicoService } from 'src/app/service/asesoria-agroquimico.service';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-asesoria-riego-agro-por-productor',
  templateUrl: './asesoria-riego-agro-por-productor.component.html',
  styleUrls: ['./asesoria-riego-agro-por-productor.component.css']
})
export class AsesoriaRiegoAgroPorProductorComponent implements OnInit {

  datos : any;
  options : any; 
  nombre: string = "";
  paletaDeColores = ['#003f5c','#2f4b7c', '#665191','#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600','#1c9be8', '#00b4eb', '#00c8cd', '#00d696', '#85dc56', '#e8d71f']
  cardSubtitulo : string = '';
  cantidadAsesoriaRiegoAplicadaByProductor: number = 0;
  cantidadAsesoriaRiegoNoAplicadaByProductor: number = 0;
  cantidadAsesoriaAgroAplicadaByProductor: number = 0;
  cantidadAsesoriaAgroNoAplicadaByProductor: number = 0;
  subtituloGrafico : string = 'Para el grafico, debes ingresar el usuario';
  tituloGrafico : string = 'Actividad';
  asesoriaRiego: AsesoriaRiego []=[];
  loading : boolean = true;
  tituloTabla : string = '';
  subTituloTabla: string ='';

  asesoriaAgro: AsesoriaAgroquimico []=[];
   //optengo fecha y hora actual del sistema
  fechaHoy: Date = new Date();


  constructor(
    private asesoriaRiegoService : AsesoriaRiegoService,
    private asesoriaAgroService : AsesoriaAgroquimicoService    
  ) { }
  ngOnInit(): void {
    //optengo fecha y hora actual del sistema
   /*  let dateFechaHoy: Date = new Date();
    this.fechaHoy=dateFechaHoy;
    console.log(this.fechaHoy); */
  
     
  }

  cargarDatos(): void{

    this.tituloGrafico = `Aplicaciones de ${this.nombre}`;

    this.asesoriaRiegoService.cantidadAsesoriaRiegoAplicadaByProductor(this.nombre).toPromise().then(data =>{
      this.cantidadAsesoriaRiegoAplicadaByProductor = data;
      this.loading = false;
      this.cargarGrafico();
      this.listadoAsesoriaRiego();
   }),

   this.asesoriaRiegoService.cantidadAsesoriaRiegoNoAplicadaByProductor(this.nombre).toPromise().then(data =>{
    this.cantidadAsesoriaRiegoNoAplicadaByProductor = data;
    this.loading = false;
    this.cargarGrafico();
    this.listadoAsesoriaRiego();
 }),
  this.asesoriaAgroService.cantidadAsesoriaAgroAplicadaByProductor(this.nombre).toPromise().then(data =>{
    this.cantidadAsesoriaAgroAplicadaByProductor = data;
    this.loading = false;
    this.cargarGrafico();
    this.listadoAsesoriaRiego();
  }),

  this.asesoriaAgroService.cantidadAsesoriaAgroNoAplicadaByProductor(this.nombre).toPromise().then(data =>{
    this.cantidadAsesoriaAgroNoAplicadaByProductor = data;
    this.loading = false;
    this.cargarGrafico();
    this.listadoAsesoriaRiego();
    this.listadoAsesoriaAgriquimico();
  })

  

  }



   cargarGrafico(): void {
    //grafico
    this.datos = {
      labels: ['Aplicada', 'No aplicada'],
      datasets : [
        {
          label : 'Asesoria riego',
          data :[this.cantidadAsesoriaRiegoAplicadaByProductor,this.cantidadAsesoriaRiegoNoAplicadaByProductor],
          backgroundColor : this.paletaDeColores[1],
          borderColor : ['black'],
          borderWidth: 1 
          
        },
        {
          label : 'Asesoria agroquímico',
          data :[this.cantidadAsesoriaAgroAplicadaByProductor, this.cantidadAsesoriaAgroNoAplicadaByProductor],
          backgroundColor : this.paletaDeColores[11],
          borderColor : ['black'],
          borderWidth: 1
          
        }
      ],
      
    }
    this.options = {
      indexAxis: 'x',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      
    }    
  }

  listadoAsesoriaRiego(): void{
    this.asesoriaRiegoService.listarAsesoriaPorProductor(this.nombre).toPromise().then(data =>{
      this.tituloTabla="Listado asesorías de riego"
      this.subTituloTabla ='Productor '+this.nombre;
      this.asesoriaRiego=data;
      this.loading = false;
    })
   
  }
  
  listadoAsesoriaAgriquimico(): void{
    this.asesoriaAgroService.listarAsesoriAgroPorProductor(this.nombre).toPromise().then(data =>{
      this.tituloTabla='Listado de asesorías de agroquímico';
      this.subTituloTabla ='Productor '+this.nombre;
      this.asesoriaAgro=data;
      this.loading = false;
     
    })
   
  }

  getSeverityByEstado(asesoriaAgro : AsesoriaAgroquimico): string {
    const serverityByEstado : {[key: string]: string} = {
      true : 'success',
      false: 'danger'
    };
    return serverityByEstado[`${asesoriaAgro.asesoriaAplicada}`];
  }

  clear(table : Table) {
    table.clear();
  }

 





}
