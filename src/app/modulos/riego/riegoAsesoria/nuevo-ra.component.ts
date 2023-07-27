import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api/menuitem';
import { RiegoDto } from 'src/app/Core/dto/riego-dto';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { Finca } from 'src/app/Core/modelo/finca';
import { CuadroService } from 'src/app/service/cuadro.service';
import { FincaService } from 'src/app/service/finca.service';
import { RiegoService } from 'src/app/service/riego.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-ra',
  templateUrl: './nuevo-ra.component.html',
  styleUrls: ['./nuevo-ra.component.css']
})
export class NuevoRAComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  usuarioProductor:any;
  riego:RiegoDto = new RiegoDto();
  isProductor: boolean = false;
  msj:string;
  fincas: Finca[];
  cuadros: Cuadro[];
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"

  constructor(
    private fincaService: FincaService,
    private tokenService: TokenService,
    private cuadroService:CuadroService,
    private riegoService: RiegoService,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.cargarItems();
  }


  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Riego'},
      {label: 'Nuevo con asesoria', disabled:true}
    ];
  }

  crearRiego(form: NgForm): void{ 
   
    Swal.fire({
      title:'¿Crear un nuevo riego?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'question'      
    }).then((result) => {
      if(result.isConfirmed){
        this.permisoRiego(form)
      }
    });

  }

  permisoRiego(form: NgForm):void{

    this.riegoService.crearRiego(this.riego).subscribe(
      
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
        title:'Error al crear el riego',
        text: this.msj,
        
      });   
    }     
    )
  }


}
