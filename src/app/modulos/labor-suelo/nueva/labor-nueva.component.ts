import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api/menuitem';
import { LaborSueloDto } from 'src/app/Core/dto/labor-suelo-dto';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { Finca } from 'src/app/Core/modelo/finca';
import { CuadroService } from 'src/app/service/cuadro.service';
import { FincaService } from 'src/app/service/finca.service';
import { LaborSueloService } from 'src/app/service/labor-suelo.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-labor-nueva',
  templateUrl: './labor-nueva.component.html',
  styleUrls: ['./labor-nueva.component.css']
})
export class LaborNuevaComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  usuarioProductor:any;
  laborSuelo:LaborSueloDto = new LaborSueloDto();
  msj:string;
  fincas: Finca[];
  cuadros: Cuadro[];
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"

  constructor(
    private laborService: LaborSueloService,
    private fincaService: FincaService,
    private tokenService: TokenService,
    private cuadroService:CuadroService,
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.usuarioProductor=this.tokenService.getUserName();
    this.listarFincasPorNombre(this.usuarioProductor);
   
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Labor suelo', routerLink:'/index'},
      {label: 'Nueva labor', disabled:true}
    ];
  }

  crearLaborSuelo(form: NgForm): void{ 
   
    Swal.fire({
      title:'¿Crear una nueva labor',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'question'      
    }).then((result) => {
      if(result.isConfirmed){
        this.permisoLabor(form)
      }
    });

  }

  permisoLabor(form: NgForm): void{
  //   const valor = document.querySelector('#labor') as HTMLInputElement;
  //  valor.addEventListener('click',event =>{
  //   event.preventDefault();
  //   this.laborSuelo.idCuadro=<number><unknown>valor.value
    console.log(this.laborSuelo.idCuadro);
  // })
    console.log(this.laborSuelo);
    this.laborService.crearLabor(this.laborSuelo).subscribe(
      
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
        title:'Error al crear la labor',
        text: this.msj,
        
      });   
    }     
    )
  }

  listarFincasPorNombre(nombreUsuairo: string): void{
    this.fincaService.listarFincaPorUsuario(nombreUsuairo).subscribe(
      data =>{
        this.fincas= data;
        this.listarCuadrosPorFinca();
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


}
