import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { AgroquimicoService } from 'src/app/service/agroquimico.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AgroquimicoDto } from 'src/app/Core/dto/agroquimico-dto';
@Component({
  selector: 'app-nuevo-agroquimico',
  templateUrl: './nuevo-agroquimico.component.html',
  styleUrls: ['./nuevo-agroquimico.component.css']
})
export class NuevoAgroquimicoComponent implements OnInit {
  home : MenuItem = {}
  items : MenuItem[] = [];
  msj: string;
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  nuevoAgro: AgroquimicoDto = new AgroquimicoDto;
  constructor(
    private agroService: AgroquimicoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Agroquímico',routerLink:'/index'},
      {label: 'Nuevo agroquímico', disabled:true}
    ];
  }

  crearAgroquimico(form: NgForm): void{
    Swal.fire({
      title:'¿Desea crear un nuevo agroquímico?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'question'      
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitacionCrearAgro(form)
      }
    });

  }

  solicitacionCrearAgro(form: NgForm):void{
    console.log(this.nuevoAgro);
    this.agroService.crearAgroquimico(this.nuevoAgro).subscribe(
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
          title:'Error al crear el agroquímico',
          text: this.msj,
          
        });        
      }
    )
  }

}
