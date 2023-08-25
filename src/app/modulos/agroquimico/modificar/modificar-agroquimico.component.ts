import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Agroquimico } from 'src/app/Core/modelo/agroquimico';
import { AgroquimicoService } from 'src/app/service/agroquimico.service';
import { ModificarAgroquimicoDto } from 'src/app/Core/dto/modificar-agroquimico-dto';

@Component({
  selector: 'app-modificar-agroquimico',
  templateUrl: './modificar-agroquimico.component.html',
  styleUrls: ['./modificar-agroquimico.component.css']
})
export class ModificarAgroquimicoComponent implements OnInit {

  msj:string;
  home : MenuItem = {}
  items : MenuItem[] = [];
  agroquimico: Agroquimico | any;
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  
  constructor(
    private router: Router,
    private location : Location,
    private activatedRoute: ActivatedRoute,
    private agroService: AgroquimicoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerAgroquimico(id);
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Agroquímico',routerLink:'/index'},
      {label:'Modificar datos', disabled:true}
    ];
    
  }

  obtenerAgroquimico(id:number):void{
    this.agroService.datalle(id).toPromise().then(
      data =>{
        this.agroquimico=data
      }, 
       err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        this.router.navigate(["/agroquimico/listarAgroquimico"]);
      }
    
    ); 
    
  }

  solitarModificacionAgroquimico(form: NgForm):void{
    Swal.fire({
      title: '¿Deseas editar los datos del agroquímico?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
    
      if (result.isConfirmed) {
        this.actualizarAgroquimico(form);
      } 
    })
  }

  actualizarAgroquimico(form: NgForm):void{

    const id = this.activatedRoute.snapshot.params.id;
    const agroModificar = new ModificarAgroquimicoDto(this.agroquimico.nombreComercial,this.agroquimico.formulaYconcentracion,this.agroquimico.principioActivo,
      this.agroquimico.tipo,this.agroquimico.tiempoDeCarencia,this.agroquimico.dosisPorHectaria,this.agroquimico.dosisPorHl,
      this.agroquimico.volumenPorHectaria);
    this.agroService.actualizarAgroquimico(id,agroModificar).toPromise().then(
      data =>{
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title:this.msj,
          text:'Datos actualizados correctamente'
        });
        //form.resetForm();
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
