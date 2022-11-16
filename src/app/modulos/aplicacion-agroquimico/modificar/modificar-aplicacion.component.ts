import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { AplicacionAgroquimico } from 'src/app/Core/modelo/aplicacion-agroquimico';
import { CuadroService } from 'src/app/service/cuadro.service';
import { AplicacionAgroquimicoService } from 'src/app/service/aplicacion-agroquimico.service';
import { EditarAplicacionAgroDto } from 'src/app/Core/dto/editar-aplicacion-agro-dto';
import { TokenService } from 'src/app/service/token.service';
import { Agroquimico } from 'src/app/Core/modelo/agroquimico';
import { AgroquimicoService } from 'src/app/service/agroquimico.service';
@Component({
  selector: 'app-modificar-aplicacion',
  templateUrl: './modificar-aplicacion.component.html',
  styleUrls: ['./modificar-aplicacion.component.css']
})
export class ModificarAplicacionComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  msj: string;
  aplicacionAgro:AplicacionAgroquimico | any; 
  cuadros: Cuadro[];
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  listadoAgroquimico: Agroquimico[];
  constructor(
    private router: Router,
    private location : Location,
    private activatedRoute: ActivatedRoute,
    private aplicacionService: AplicacionAgroquimicoService,
    private cuadroService: CuadroService,
    private agroquimicoService: AgroquimicoService
  ) { }

  ngOnInit(): void {
  
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerAplicacionAgro(id);
    this.listarCuadrosPorFinca(1);
    this.listarAgroquimicos();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Aplicacion agroquímico'},
      {label:'Modificar datos', disabled:true}
    ];
    
  }

  obtenerAplicacionAgro(id:number):void{
    this.aplicacionService.datalle(id).toPromise().then(
      data =>{
        this.aplicacionAgro=data;

      }, 
       err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        this.router.navigate(["/aplicacionAgroquimico/listadoAplicacionAgroPorFinca"]);
      }
    
    ); 
    
  }

  solitarModificacionAplicacionAgro(form: NgForm):void{
    Swal.fire({
      title: '¿Deseas editar los datos de la aplicación de agroquímico?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
    
      if (result.isConfirmed) {
        this.actualizarAplicacionAgro(form);
      } 
    })
  }

  actualizarAplicacionAgro(form: NgForm):void{

    const id = this.activatedRoute.snapshot.params.id;
    const modificarAplicacionAgro = new EditarAplicacionAgroDto(this.aplicacionAgro.agroquimico.id,this.aplicacionAgro.cuadro.idCuadro,
      this.aplicacionAgro.dosisPorHectaria,this.aplicacionAgro.dosisPorHl,this.aplicacionAgro.volumenPorHectaria,this.aplicacionAgro.objetivo,
      this.aplicacionAgro.observaciones,this.aplicacionAgro.justificacion,this.aplicacionAgro.plaga);
    console.log(modificarAplicacionAgro);
    this.aplicacionService.actualizarAplicacionAgro(id,modificarAplicacionAgro).toPromise().then(
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

listarAgroquimicos():void{
  this.agroquimicoService.listarAgroquimico().subscribe(
    data =>{
      this.listadoAgroquimico = data;
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
