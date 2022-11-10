import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantacionService } from 'src/app/service/plantacion.service';
import { Plantacion } from 'src/app/Core/modelo/plantacion';
import { ModificarPlantacionDto } from 'src/app/Core/dto/modificar-plantacion-dto';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { CuadroService } from 'src/app/service/cuadro.service';
import { CultivoService } from 'src/app/service/cultivo.service';
import { Cultivo } from 'src/app/Core/modelo/cultivo';

@Component({
  selector: 'app-actualizar-plantacion',
  templateUrl: './actualizar-plantacion.component.html',
  styleUrls: ['./actualizar-plantacion.component.css']
})
export class ActualizarPlantacionComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  msj: string;
  plantacion:Plantacion | any;
  cuadros: Cuadro[];
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  listadoCultivo:Cultivo[];
  constructor(
    private router: Router,
    private location : Location,
    private activatedRoute: ActivatedRoute,
    private plantacionService: PlantacionService,
    private cuadroService: CuadroService,
    private cultivoService:CultivoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerPlantacion(id);
    this.listarCuadrosPorFinca();
   // this.listarCultivos();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Plantación'},
      {label:'Modificar datos', disabled:true}
    ];
    
  }

   obtenerPlantacion(id:number):void{
     this.plantacionService.datallePlantacion(id).toPromise().then(
       data =>{
         this.plantacion=data;
       }, 
        err => {
         Swal.fire('Error', err.error.mensaje, 'error');
         this.router.navigate(["/plantacion/listadoPlantacionPorCultivo"]);
       }
    
     ); 
    
   }

   solitarModificacionLaborPlantacion(form: NgForm):void{
    Swal.fire({
      title: '¿Deseas editar los datos de la plantación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
    
      if (result.isConfirmed) {
        this.actualizarPlantacion(form);
      } 
    })
  }

  actualizarPlantacion(form: NgForm):void{

    const id = this.activatedRoute.snapshot.params.id;
    const modificarPlantacion = new ModificarPlantacionDto(this.plantacion.entreIleras,this.plantacion.entrePlantas,this.plantacion.observacion,
     this.plantacion.justificacion,this.plantacion.sistemaRiego,this.plantacion.sistemaTrasplante,this.plantacion.nombreTipoCultivo.idCultivo,this.plantacion.cantidadPlantines);
    console.log(modificarPlantacion);
    this.plantacionService.actualizaPlantacion(id,modificarPlantacion).toPromise().then(
      data =>{
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title:this.msj,
          text:'Datos actualizados correctamente'
        });
       // form.resetForm();
      }, 
      err => {
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title: 'No se actualizaron los datos',
          text: this.msj
          
        });
      }
      )

  }

  listarCuadrosPorFinca(): void{
      this.cuadroService.listarCuadrosPorFinca(2).subscribe(
        data =>{
          this.cuadros=data;
         
        },
        err =>{
          console.log(err);
        }
      )  
  
   
  } 

  // listarCultivos():void{
  //   this.cultivoService.listarCultivo().subscribe(
  //     data =>{
  //       this.listadoCultivo = data;
  //     },
  //     err =>{
  //       console.log(err);
  //     }
  //   )
  // }

  cerrar(): void {
    this.location.back();
  }

}

