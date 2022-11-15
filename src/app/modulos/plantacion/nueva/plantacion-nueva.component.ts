import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api/menuitem';
import { PlantacionDto } from 'src/app/Core/dto/plantacion-dto';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { Cultivo } from 'src/app/Core/modelo/cultivo';
import { Finca } from 'src/app/Core/modelo/finca';
import { CuadroService } from 'src/app/service/cuadro.service';
import { CultivoService } from 'src/app/service/cultivo.service';
import { FincaService } from 'src/app/service/finca.service';
import { PlantacionService } from 'src/app/service/plantacion.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-plantacion-nueva',
  templateUrl: './plantacion-nueva.component.html',
  styleUrls: ['./plantacion-nueva.component.css']
})
export class PlantacionNuevaComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  usuarioProductor:any;
  plantacion: PlantacionDto = new PlantacionDto() 
  obtenerFinca: any;
  msj:string;
  fincas: Finca[];
  cuadros: Cuadro[];
  listarCua:Cuadro[];
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  listadoCultivo:Cultivo[];

  constructor(
    private tokenService: TokenService,
    private plantacionService: PlantacionService,
    private fincaService: FincaService,
    private cuadroService:CuadroService,
    private cultivoService:CultivoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.usuarioProductor=this.tokenService.getUserName();
    this.listarFincasPorNombre(this.usuarioProductor);
    this.listarCuadrosPorFinca();
    this.listarCultivos();
   
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Plantacion', routerLink:'/index'},
      {label: 'Nueva Plantacion', disabled:true}
    ];
  }

  crearPlantacion(form: NgForm): void{ 
   
    Swal.fire({
      title:'¿Crear una nueva plantación?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'question'      
    }).then((result) => {
      if(result.isConfirmed){
        this.permisoPlantacion(form)
      }
    });

  }

  permisoPlantacion(form: NgForm): void{

    this.plantacionService.crearPlantacion(this.plantacion).subscribe(
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
        title:'Error al crear la finca',
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
      this.plantacion.idFinca=<number><unknown>valor.value;
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

  listarCultivos():void{
    this.cultivoService.listarCultivo().subscribe(
      data =>{
        this.listadoCultivo = data;
      },
      err =>{
        console.log(err);
      }
    )
  }






}
