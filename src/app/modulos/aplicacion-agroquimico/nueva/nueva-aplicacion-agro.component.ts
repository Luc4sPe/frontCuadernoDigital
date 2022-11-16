import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api/menuitem';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { AplicacionAgroquimicoDto } from 'src/app/Core/dto/aplicacion-agroquimico-dto';
import { FincaService } from 'src/app/service/finca.service';
import { TokenService } from 'src/app/service/token.service';
import { CuadroService } from 'src/app/service/cuadro.service';
import { AplicacionAgroquimicoService } from 'src/app/service/aplicacion-agroquimico.service';
import { Finca } from 'src/app/Core/modelo/finca';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { AgroquimicoService } from 'src/app/service/agroquimico.service';
import { Agroquimico } from 'src/app/Core/modelo/agroquimico';
@Component({
  selector: 'app-nueva-aplicacion-agro',
  templateUrl: './nueva-aplicacion-agro.component.html',
  styleUrls: ['./nueva-aplicacion-agro.component.css']
})
export class NuevaAplicacionAgroComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  msj:string;
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  usuarioProductor:any;
  aplicacionAgro:AplicacionAgroquimicoDto =new AplicacionAgroquimicoDto();
  fincas: Finca[];
  cuadros: Cuadro[];
  listadoAgroquimico: Agroquimico[];
  constructor(
    private fincaService: FincaService,
    private tokenService: TokenService,
    private cuadroService:CuadroService,
    private aplicacionService: AplicacionAgroquimicoService,
    private location : Location,
    private agroquimicoService: AgroquimicoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.usuarioProductor=this.tokenService.getUserName();
    this.listarFincasPorNombre(this.usuarioProductor);
    this.listarCuadrosPorFinca();
    this.listarAgroquimicos();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Aplicación agroquímico', routerLink:'/index'},
      {label: 'Nueva', disabled:true}
    ];
  }

  crearAplicacion(form: NgForm): void{ 
   
    Swal.fire({
      title:'¿Crear una nueva aplicacion?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'question'      
    }).then((result) => {
      if(result.isConfirmed){
        this.permisoAplicacion(form)
      }
    });

  }

  permisoAplicacion(form: NgForm):void{

    this.aplicacionService.crearAplicacionAgro(this.aplicacionAgro).subscribe(
      
      data =>{
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
        title:'Error al crear la aplicacion de agroquímico',
        text: this.msj,
        
      });   
    }     
    )
  }

  async listarFincasPorNombre(nombreUsuairo: string): Promise<void>{
    await this.fincaService.listarFincaPorUsuario(nombreUsuairo).subscribe(
      data =>{
        this.fincas= data;
      },
      err =>{
        console.log(err);
      }
    )
    
  }

  listarCuadrosPorFinca(): void{
    const valor = document.querySelector('#nomreFinca') as HTMLSelectElement;
    valor.addEventListener('click',event =>{
      event.preventDefault();
      this.cuadroService.listarCuadrosPorFinca(<number><unknown>valor.value).subscribe(
        data =>{
          this.cuadros=data;
         
        },
        err =>{
          console.log(err);
        }
      )  
    })
   
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
