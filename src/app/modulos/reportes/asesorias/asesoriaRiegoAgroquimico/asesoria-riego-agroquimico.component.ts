import { Component,OnInit } from '@angular/core';
import { AsesoriaAgroquimicoService } from 'src/app/service/asesoria-agroquimico.service';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';
import { FechaDesdeHastaService } from 'src/app/service/fecha-desde-hasta-service';

@Component({
  selector: 'app-asesoria-riego-agroquimico',
  templateUrl: './asesoria-riego-agroquimico.component.html',
  styleUrls: ['./asesoria-riego-agroquimico.component.css']
})
export class AsesoriaRiegoAgroquimicoComponent implements OnInit{

 
  datos : any
  options : any 
  paletaDeColores = ['#003f5c','#2f4b7c', '#665191','#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600','#1c9be8', '#00b4eb', '#00c8cd', '#00d696', '#85dc56', '#e8d71f']
  cardSubtitulo : string = '';
  cantidadAsesoriaRiegoAplicada: number = 0;
  cantidadAsesoriaNoRiegoAplicada: number = 0;
  cantidadAsesoAgroAplicada: number = 0;
  cantidadAsesoAgroNoAplicada: number = 0;

  constructor(
    private asesoriariegoService : AsesoriaRiegoService,
    private asesoriaAgroService : AsesoriaAgroquimicoService    
  ) { }

  ngOnInit(): void {
    
    this.cargarAlInicio();
  }

 cargarAlInicio(){
  this.obtenerCantidadAsesoriaRiegoAplicada();
  this.obtenerCantidadAsesoriaNoRiegoAplicada();
  this.obtenerCantidadAsesoriaAgroAplicada();
  this.obtenerCantidadAsesoriaAgroNoAplicada();
 }
  
  public obtenerCantidadAsesoriaRiegoAplicada(): void{
    this.asesoriariegoService.cantidadAsesoriaRiegoAplicada().toPromise().then(data =>{
      this.cantidadAsesoriaRiegoAplicada = data;
      this.cargarGraficoo();

    })
  }
  public obtenerCantidadAsesoriaNoRiegoAplicada(): void{
    this.asesoriariegoService.cantidadAsesoriaRiegoNoAplicada().toPromise().then(data =>{
      this.cantidadAsesoriaNoRiegoAplicada = data;
      this.cargarGraficoo();

    })
  }

  public obtenerCantidadAsesoriaAgroAplicada(): void{
    this.asesoriaAgroService.cantidadAsesoriaAgroAplicada().toPromise().then(data =>{
      this.cantidadAsesoAgroAplicada = data;
      this.cargarGraficoo();
    })
  }

  public obtenerCantidadAsesoriaAgroNoAplicada(): void{
    this.asesoriaAgroService.cantidadAsesoriaAgroNoAplicada().toPromise().then(data =>{
      this.cantidadAsesoAgroNoAplicada = data;
      this.cargarGraficoo();
    })
  }

   cargarGraficoo(): void {
    //grafico
    this.datos = {
      labels: ['Aplicada', 'No aplicada'],
      datasets : [
        {
          label : 'Asesoria riego',
          data :[this.cantidadAsesoriaRiegoAplicada,this.cantidadAsesoriaNoRiegoAplicada],
          backgroundColor : this.paletaDeColores[8],
          borderColor : ['black'],
          borderWidth: 1 
          
        },
        {
          label : 'Asesoria agroquímico',
          data :[this.cantidadAsesoAgroAplicada, this.cantidadAsesoAgroNoAplicada],
          backgroundColor : this.paletaDeColores[12],
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

 
 

 
}
