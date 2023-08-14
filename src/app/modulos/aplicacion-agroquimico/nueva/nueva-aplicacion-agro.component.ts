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
import { AsesoriaAgroquimico } from 'src/app/Core/modelo/asesoria-agroquimico';
import { AsesoriaAgroquimicoService } from 'src/app/service/asesoria-agroquimico.service';
import { Table } from 'primeng/table';
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
  //atributos para agregar la lista de asesoría de agroquímico

  loading : boolean = true;
  listadoAsesoria: AsesoriaAgroquimico[];
  asesoriaFiltrados:AsesoriaAgroquimico[];
  asesoriaAgro: AsesoriaAgroquimico | any;
  anuncio : string = ''; 
  isProductor: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private fincaService: FincaService,
    private tokenService: TokenService,
    private cuadroService:CuadroService,
    private aplicacionService: AplicacionAgroquimicoService,
    private location : Location,
    private agroquimicoService: AgroquimicoService,
    private asesoriaService: AsesoriaAgroquimicoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.isProductor=this.tokenService.isProductor();
    this.isAdmin=this.tokenService.isAdmin();
    this.usuarioProductor=this.tokenService.getUserName();
    this.listarFincasPorNombre(this.usuarioProductor);
    this.listarCuadrosPorFinca();
    this.listarAgroquimicos();
    this.listadoAsesoriaDeUnaFinca();
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


  listadoAsesoriaDeUnaFinca(): void{
    const valor = document.querySelector('#nomreFinca') as HTMLSelectElement;
    valor.addEventListener('click',event =>{
      event.preventDefault();
      this.asesoriaService.listarAsesoriaPorFinca(<number><unknown>valor.value).subscribe(
        data =>{
          this.listadoAsesoria = data;
          this.loading=false;
        },
        err =>{
          console.log(err);
        }
        
      )
     })
   
  } 

  getSeverityByEstado(asesoria : AsesoriaAgroquimico): string {
    const serverityByEstado : {[key: string]: string} = {
      true : 'success',
      false: 'danger'
    };
    return serverityByEstado[`${asesoria.asesoriaAplicada}`];
  }


  aplico(id: number):void {
    /*se solicita al backend la utilización de la asesoria */
    this.asesoriaService.seAplico(id).subscribe(  
      (data) => {
        this.anuncio = data.mensaje;
        
        Swal.fire('Aplicada', this.anuncio, 'success');
      
        setInterval("location.reload()",3000);
      }, 
      (err) => {
        this.anuncio = err.error.mensaje;
        Swal.fire('Error al aplicar', this.anuncio, 'error')

      })
  }

  mostrarForm(): void{
    const botonRiego= document.getElementById('form') as HTMLButtonElement ;
    botonRiego.style.display ='block';
 
    const botonAsesoria= document.getElementById('card') as HTMLButtonElement ;
    botonAsesoria.style.display ='none';
   }

   mostrarCard(): void{
    const botonAsesoria= document.getElementById('card') as HTMLButtonElement ;
    botonAsesoria.style.display ='block';

    const botonRiego= document.getElementById('form') as HTMLButtonElement ;
    botonRiego.style.display ='none';
    
  }

  clear(table : Table){
    table.clear();
  }

  obtenerAsesoriaFiltradas(table: Table): void {
    this.asesoriaFiltrados = table.filteredValue != null ? table.filteredValue : this.listadoAsesoria;
  }


  obtenerFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }

 

}
