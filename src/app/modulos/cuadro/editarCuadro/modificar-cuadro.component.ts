import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { CuadroService } from 'src/app/service/cuadro.service';
import { ModificarCuadroDto } from 'src/app/Core/dto/modificar-cuadro-dto';

@Component({
  selector: 'app-modificar-cuadro',
  templateUrl: './modificar-cuadro.component.html',
  styleUrls: ['./modificar-cuadro.component.css']
})
export class ModificarCuadroComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  msj: string;
  cuadro: Cuadro | any;
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  constructor(
    private router: Router,
    private location : Location,
    private activatedRoute: ActivatedRoute,
    private cuadroService: CuadroService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerCuadro(id);
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Finca'},
      {label:'Modificar cuadro', disabled:true}
    ];
    
  }

  obtenerCuadro(id:number):void{
    this.cuadroService.datalle(id).toPromise().then(
      data =>{
        this.cuadro=data;

      }, 
       err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        this.router.navigate(["/index"]);
      }
    
    ); 
    
  }

  solitarModificacionCuadro(form: NgForm):void{
    Swal.fire({
      title: '¿Deseas modificar los datos de los cuadro de la finca?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
    
      if (result.isConfirmed) {
        this.actualizarCuadro(form);
      } 
    })
  }


  actualizarCuadro(form: NgForm):void{
    const id = this.activatedRoute.snapshot.params.id;
    const modificarCuadro = new ModificarCuadroDto(this.cuadro.numeroCuadro,this.cuadro.superficieHectarea);
    console.log(modificarCuadro);
    this.cuadroService.actualizarCuadro(id,modificarCuadro).toPromise().then(
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

  cerrar(): void {
    this.location.back();
  }

}
