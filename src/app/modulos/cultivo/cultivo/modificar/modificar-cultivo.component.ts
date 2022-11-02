import { Component, OnInit } from '@angular/core';
import { Cultivo } from 'src/app/Core/modelo/cultivo';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CultivoService } from 'src/app/service/cultivo.service';
import { CultivoDto } from 'src/app/Core/dto/cultivo-dto';
import { NgForm } from '@angular/forms';
import { ModificarCultivoDto } from 'src/app/Core/dto/modificar-cultivo-dto';

@Component({
  selector: 'app-modificar-cultivo',
  templateUrl: './modificar-cultivo.component.html',
  styleUrls: ['./modificar-cultivo.component.css']
})
export class ModificarCultivoComponent implements OnInit {

  cultivo: Cultivo | any;
  msj:string;
  home : MenuItem = {}
  items : MenuItem[] = [];

  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"

  constructor(
    private router: Router,
    private location : Location,
    private cultivoService: CultivoService,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerCultivo(id);
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Cultivo'},
      {label:'Modificar datos', disabled:true}
    ];
    
  }

  obtenerCultivo(id:number):void{
    this.cultivoService.datalle(id).toPromise().then(
      data =>{
        this.cultivo=data
      }, 
       err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        this.router.navigate(["/cultivo/listado"]);
      }
    
    ); 
    
  }

  solitarModificacionCultivo(form: NgForm):void{
    Swal.fire({
      title: '¿Deseas editar los datos del cultivo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
    
      if (result.isConfirmed) {
        this.actualizarCultivo(form);
      } 
    })
  }

  actualizarCultivo(form: NgForm){
    const id = this.activatedRoute.snapshot.params.id;
    const cultivoModificar = new ModificarCultivoDto(this.cultivo.nombre,this.cultivo.remito,this.cultivo.timpoCarencia,this.cultivo.variedadCultivo,
      this.cultivo.viveroProvedor);
    this.cultivoService.actualizarCultivo(id,cultivoModificar).toPromise().then(
      data =>{
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title:this.msj,
          text:'Datos actualizados correctamente'
        });
        form.resetForm();
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
