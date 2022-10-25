import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api/menuitem';
import {StepsModule} from 'primeng/steps';
import { FincaDto } from 'src/app/Core/dto/finca-dto';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { FincaService } from 'src/app/service/finca.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { CultivoService } from 'src/app/service/cultivo.service';
import { CuadroDto } from 'src/app/Core/dto/cuadro-dto';
import { __values } from 'tslib';
import { CuadroService } from 'src/app/service/cuadro.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-finca-nueva',
  templateUrl: './finca-nueva.component.html',
  styleUrls: ['./finca-nueva.component.css']
})

export class FincaNuevaComponent implements OnInit {

  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  home : MenuItem = {}
  items : MenuItem[] = [];
  usuarios: Usuario[]=[];
  usuariosAsignado:Usuario[]=[];
  nuevaFinca: FincaDto = new FincaDto();
 
  cuadros: any []=[];
  asignarCuadro: Cuadro[]=[];
  loading : boolean = true;
  productorDueño!: string;
  msj: string;
  
  

  constructor(
    private fincaServi: FincaService,
    private cultivoServi: CultivoService,
    private cuadroServi: CuadroService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.cargarUsuario("ROLE_PRODUCTOR");
    //this.agregarCuadro();
    
    
  }

  
  
  
  crearFinca(form: NgForm): void{ 
     
    Swal.fire({
      title:'¿Crear una finca nueva?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'question'      
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitudCrearFinca(form)
      }
    });

  }
  solicitudCrearFinca(form: NgForm):void{
  
    this.fincaServi.crearFinca(this.nuevaFinca).subscribe(
      data => {
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title: this.msj,
          text: 'Para terminar debe cargar los cuadros',
        }).then((result) =>{
          if(result.isConfirmed){
            this.router.navigate([`/cuadro/crearcuadro`]);
          }
        }
        );

        form.resetForm();
        
      },
      err =>{
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title:'Error al crear la finca',
          text: this.msj,
          
        });        
      }
      

    )

  }

  
  

  

   // carga los cuadros solo en el navegador 
  /*  agregarCuadro() {

    interface CuadroInterfaz{
      numeroCuadro :string,
      superficieHectarea :number,
      idFinca:number

   } 
   const numeroCap = document.querySelector('#num') as HTMLInputElement ;
   const superCap = document.querySelector('#superficie') as HTMLInputElement;
   const form = document.querySelector('#estoy') as HTMLFormElement;
   
    
    form.addEventListener ('reset', event => {
      event.preventDefault;
      eliminar();
    
    }); 
    
   form.addEventListener('submit', event =>{
     event.preventDefault();
     const cuadroNuevo :CuadroInterfaz={
      numeroCuadro :numeroCap.value,
      superficieHectarea :superCap.valueAsNumber,
      idFinca:this.nuevaFinca.idFinca
      }
      cargar(cuadroNuevo);  
   });

  
 
   const cuad:any = [];
   
   this.nuevoCuadro=cuad;
   this.nuevaFinca.cuadros=cuad;
    console.log(cuad);

   function cargar(cuadroNuevo:CuadroInterfaz){
      cuad.push(cuadroNuevo); 
        
      document.querySelector("#tabla")!.innerHTML +='<tbody><td>'+cuadroNuevo.numeroCuadro+'</td> <td>'+cuadroNuevo.superficieHectarea+'</td></tbody>';
          
    }

   

     function eliminar(){
      cuad.pop();
      document.querySelector('tbody')!.remove();
    
    } 
   
    
 }
 */

  
  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Finca', routerLink:'/index'},
      {label: 'Nueva Finca', disabled:true}
    ];
  }

  leyendaCuadrosSeleccionados(): string {
    return `${this.asignarCuadro.length} Cuadros seleccionados`;
  }

  leyendaUsuarioSeleccionados(): string {
    return `${this.usuariosAsignado.length} Productor seleccionados`;
  }

  

  async cargarUsuario(nombreUsuario: string): Promise<void>{
    await  this.cultivoServi.listarUsuarioPorRol(nombreUsuario).subscribe(
      data => {
        this.usuarios=data;
        this.loading=false;
      },
      err => {
        console.log(err);
      }
    );

  }

}


