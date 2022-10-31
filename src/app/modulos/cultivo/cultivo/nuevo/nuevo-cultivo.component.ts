import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { CultivoDto } from 'src/app/Core/dto/cultivo-dto';
import { CultivoService } from 'src/app/service/cultivo.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-cultivo',
  templateUrl: './nuevo-cultivo.component.html',
  styleUrls: ['./nuevo-cultivo.component.css']
})
export class NuevoCultivoComponent implements OnInit {
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  home : MenuItem = {}
  items : MenuItem[] = [];
  nuevoCultivo: CultivoDto = new CultivoDto;
  msj: string;
  
  constructor(
    private cultivoService: CultivoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
  }

  crearCultivo(form: NgForm): void{
    Swal.fire({
      title:'¿Crear un cultivo nuevo?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'question'      
    }).then((result) => {
      if(result.isConfirmed){
        this.soliciotacionCrearCultivo(form)
      }
    });

  }

  soliciotacionCrearCultivo(form: NgForm): void{
    this.cultivoService.crearCultivo(this.nuevoCultivo).subscribe(
      data=>{
        this.msj=data.mensaje;
        Swal.fire({
          icon: 'success',
          title: this.msj,
          text: '',
        });

        form.resetForm();
      },
      err =>{
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title:'Error al crear el cultivo',
          text: this.msj,
          
        });        
      }
    )
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Cultivo'},
      {label: 'Nuevo Cultivo', disabled:true}
    ];
  }

}
