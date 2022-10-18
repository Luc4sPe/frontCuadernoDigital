import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api/menuitem';
import { CuadroDto } from 'src/app/Core/dto/cuadro-dto';
import { Finca } from 'src/app/Core/modelo/finca';
import { CuadroService } from 'src/app/service/cuadro.service';
import { FincaService } from 'src/app/service/finca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-cuadro',
  templateUrl: './nuevo-cuadro.component.html',
  styleUrls: ['./nuevo-cuadro.component.css']
})
export class NuevoCuadroComponent implements OnInit {

  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  home : MenuItem = {}
  items : MenuItem[] = [];
  nuevoCuadro:CuadroDto= new CuadroDto();
  msj: string;
  fincas: Finca[];

  constructor(
    private cuadroServi:CuadroService,
    private fincaService:FincaService
    ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.cargarListaFinca(); 
  }

  crearCuadro(form :NgForm):void{

    let id = document.querySelector('#nomreUsuario') as HTMLSelectElement;
    id.addEventListener('click', event =>{  
      
    this.nuevoCuadro.idFinca=<number><unknown>id.value;
    console.log(this.nuevoCuadro.idFinca);
  
    })

    this.cuadroServi.crearCuadro(this.nuevoCuadro).subscribe(
      data => {
        document.querySelector("#tabla")!.innerHTML +='<tbody><td>'+this.nuevoCuadro.numeroCuadro+'</td> <td>'+this.nuevoCuadro.superficieHectarea+'</td></tbody>';
        this.msj = data.mensaje;
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
          title:'Error al crear el cuadro',
          text: this.msj,
          
        });        
      }
    )
  }

  cargarListaFinca():void{
    this.fincaService.listar().subscribe(
      data =>{
        this.fincas=data;
        console.log(this.fincas);
      },
      err =>{
        console.log(err);
      }
    )
  }


  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Cuadro', routerLink:'/cuadro'},
      {label: 'Nuevo cuadro', disabled:true}
    ];
  }
  

}
