import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { EditarRiego } from 'src/app/Core/dto/editar-riego';

import { Riego } from 'src/app/Core/modelo/riego';
import { RiegoService } from 'src/app/service/riego.service';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { CuadroService } from 'src/app/service/cuadro.service';


@Component({
  selector: 'app-editar-riego',
  templateUrl: './editar-riego.component.html',
  styleUrls: ['./editar-riego.component.css']
})
export class EditarRiegoComponent implements OnInit {
  
  home : MenuItem = {}
  items : MenuItem[] = [];
  msj: string;
  riego:Riego | any; 
  cuadros: Cuadro[];
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
 
  constructor(
    private router: Router,
    private location : Location,
    private activatedRoute: ActivatedRoute,
    private riegoService: RiegoService,
    private cuadroService: CuadroService 
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerRiego(id);
    this.listarCuadrosPorFinca(1);
  }
 
  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Riego'},
      {label:'Modificar datos', disabled:true}
    ];
    
  }

  obtenerRiego(id:number):void{
    this.riegoService.datalleRiego(id).toPromise().then(
      data =>{
        this.riego=data;

      }, 
       err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        this.router.navigate(["/riego/listadoRiegoPorFinca"]);
      }
    
    ); 
    
  }

  solitarModificacionRiego(form: NgForm):void{
    Swal.fire({
      title: '¿Deseas editar los datos del riego?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
    
      if (result.isConfirmed) {
        this.actualizarRiego(form);
      } 
    })
  }

  actualizarRiego(form: NgForm):void{
    const id = this.activatedRoute.snapshot.params.id;
    const modificarRiego = new EditarRiego(this.riego.duracionEnHoras,this.riego.milimetrosAplicados,this.riego.idCuadro.idCuadro,
      this.riego.observacionProductor,this.riego.justificacionProductor,this.riego.idFinca);
    console.log(modificarRiego);
    this.riegoService.actualizarRiego(id,modificarRiego).toPromise().then(
      data =>{
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title:this.msj,
          text:'Datos actualizados correctamente'
        });
       // form.resetForm();
      }, 
      err => {
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title: 'No se actualizaron los datos',
          text: this.msj
          
        });
      }
      )
  }

  listarCuadrosPorFinca(id: number): void{
   
      this.cuadroService.listarCuadrosPorFinca(1).subscribe(
        data =>{
          this.cuadros=data;
         
        },
        err =>{
          console.log(err);
        }
      )  
  
   
  } 

  cerrar(): void {
    this.location.back();
  }


}
