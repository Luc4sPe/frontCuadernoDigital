import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LaborSuelo } from 'src/app/Core/modelo/labor-suelo';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LaborSueloService } from 'src/app/service/labor-suelo.service';
import { LaborSueloDto } from 'src/app/Core/dto/labor-suelo-dto';
import { ModificarLaborDto } from 'src/app/Core/dto/modificar-labor-dto';

@Component({
  selector: 'app-actualizar-labor',
  templateUrl: './actualizar-labor.component.html',
  styleUrls: ['./actualizar-labor.component.css']
})
export class ActualizarLaborComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  msj: string;
  laborSuelo: LaborSuelo | any;
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  constructor(
    private router: Router,
    private location : Location,
    private activatedRoute: ActivatedRoute,
    private laborService: LaborSueloService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerLabor(id);
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Labor suelo'},
      {label:'Modificar datos', disabled:true}
    ];
    
  }

  obtenerLabor(id:number):void{
    this.laborService.datalleLaborSuelo(id).toPromise().then(
      data =>{
        this.laborSuelo=data;

      }, 
       err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        this.router.navigate(["/laborSuelo/listadoLaborSueloPorFinca"]);
      }
    
    ); 
    
  }

  solitarModificacionLaborSuelo(form: NgForm):void{
    Swal.fire({
      title: '¿Deseas editar los datos de la labor de suelo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
    
      if (result.isConfirmed) {
        this.actualizarLabor(form);
      } 
    })
  }

  actualizarLabor(form: NgForm):void{
    const id = this.activatedRoute.snapshot.params.id;
    const modificarLabor = new ModificarLaborDto(this.laborSuelo.idCuadro.cultivoAnterior,this.laborSuelo.herramientasUtilizadas,
      this.laborSuelo.idCuadro.idCuadro,this.laborSuelo.labor,this.laborSuelo.observacion,this.laborSuelo.justificacion,this.laborSuelo.finca.idFinca);
    console.log(modificarLabor);
    this.laborService.actualizarLabor(id,modificarLabor).toPromise().then(
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
