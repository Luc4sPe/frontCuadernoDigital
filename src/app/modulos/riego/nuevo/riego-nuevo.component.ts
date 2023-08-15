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
import { Location } from '@angular/common';
import { AsesoriaRiego } from 'src/app/Core/modelo/asesoria-riego';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ValidateEqualDirective } from 'ng-validate-equal';
import { eventListeners } from '@popperjs/core';

@Component({
  selector: 'app-riego-nuevo',
  templateUrl: './riego-nuevo.component.html',
  styleUrls: ['./riego-nuevo.component.css']
})
export class RiegoNuevoComponent implements OnInit {

  anuncio : string = ''; 
  home : MenuItem = {}
  items : MenuItem[] = [];
  usuarioProductor:any;
  riego:RiegoDto = new RiegoDto();
  asesiria: AsesoriaRiego;
  isProductor: boolean = false;
  isAdmin: boolean = false;
  msj:string;
  fincas: Finca[];
  cuadros: Cuadro[];
  asesorias: AsesoriaRiego[];
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"

  loading : boolean = true;
  listadoAsesoria: AsesoriaRiego[];
  asesoriaFiltrados:AsesoriaRiego[];
  asesoriaRiego:AsesoriaRiego | any;

  constructor(  
    private fincaService: FincaService,
    private tokenService: TokenService,
    private cuadroService:CuadroService,
    private riegoService: RiegoService,
    private location : Location,
    private router: Router,
    private asesoriaService:AsesoriaRiegoService,
    ) { }

  ngOnInit(): void {
   
    this.cargarItems();
    this.isProductor=this.tokenService.isProductor();
    this.isAdmin=this.tokenService.isAdmin();
    this.usuarioProductor=this.tokenService.getUserName();
    this.listarFincasPorNombre(this.usuarioProductor);
    this.listarCuadrosPorFinca();
    this.listadoAsesoriaDeUnaFinca();
    
    
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Riego'},
      {label: 'Nuevo', disabled:true}
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


  async listarFincasPorNombre(nombreUsuairo: string): Promise<void>{
    await this.fincaService.listarFincaPorUsuario(nombreUsuairo).subscribe(
      data =>{
        this.fincas= data;
        //console.log(this.fincas);
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
      //this.laborSuelo.idFinca=<number><unknown>valor.value;
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

  getSeverityByEstado(asesoria : AsesoriaRiego): string {
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

  cancelarApli(id: number): void {

    /*solicito al backend la cancelación de la asesoria */
    this.asesoriaService.cancelarAplicacion(id).subscribe(
      (data) => {
        this.anuncio = data.mensaje;
        Swal.fire('Usuario Inactivo', this.anuncio, 'success');
        setInterval("location.reload()",3000);
      }, 
      (err) => {
        this.anuncio = err.error.mensaje;
        Swal.fire('Error al cancelar la apliocaón de la', this.anuncio, 'error')

      })

  }


  
  

   
  //metodos para ocultar el formulario dependiendo de que boton se presione es el formulario q aparece

  /* mostrarForm(): void{
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
      
    } */
   



  cerrar(): void {
    this.location.back();
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
