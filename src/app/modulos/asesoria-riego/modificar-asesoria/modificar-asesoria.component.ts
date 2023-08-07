import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ModificarAsesoRiego } from 'src/app/Core/dto/modificar-aseso-riego';
import { AsesoriaRiego } from 'src/app/Core/modelo/asesoria-riego';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FincaService } from 'src/app/service/finca.service';
import { Finca } from 'src/app/Core/modelo/finca';
import { CuadroService } from 'src/app/service/cuadro.service';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { AsesoriaRiegoDto } from 'src/app/Core/dto/asesoria-riego-dto';
@Component({
  selector: 'app-modificar-asesoria',
  templateUrl: './modificar-asesoria.component.html',
  styleUrls: ['./modificar-asesoria.component.css']
})
export class ModificarAsesoriaComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  asesoriaRiego: AsesoriaRiego | any;
  msj: string;
  usuarios: Usuario[]=[];
  loading : boolean = true;
  fincas: Finca[]=[];
  cuadros: Cuadro[];
  
    modificarAsesoria = <ModificarAsesoRiego>{}

  constructor(
    private asesoriaService: AsesoriaRiegoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location : Location,
    private usuarioPorRol: UsuarioService,
    private fincaService: FincaService,
    private cuadroService: CuadroService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerAsesoria(id);
    this.cargarUsuario("ROLE_PRODUCTOR");
    this.listarFincasPorNombreProductor();
    this.listarCuadrosPorFinca();
  }


  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Asesoria riego'},
      {label:'Modificar datos', disabled:true}
    ];
    
  }

  obtenerAsesoria(id:number):void{
    this.asesoriaService.obtenerAsesoria(id).toPromise().then(
      (data) =>{
        this.asesoriaRiego=data;
        this.asesoriaRiego.fechaEstimadaAplicacionParsed = new Date (this.asesoriaRiego.fechaEstimadaAplicacionParsed);
       
      }, 
       err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        this.router.navigate(["/asesoramientoRiego/listaAsesoria"]);
      }
   
    ); 
   
  }



  solitarModificacionAsesoria(form: NgForm):void{
   
    Swal.fire({
      title: '¿Deseas editar los datos de la asesoria?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
    
      if (result.isConfirmed) {
        this.actualizarAsesoria(form);
      } 
    })
  }


  actualizarAsesoria(form: NgForm):void{
    
    const id = this.activatedRoute.snapshot.params.id;
    const modificarAsesoria = new ModificarAsesoRiego(this.asesoriaRiego.duracionEnHoras,this.asesoriaRiego.milimetrosAplicados,
      this.asesoriaRiego.finca.idFinca,this.asesoriaRiego.cuadro.idCuadro,this.asesoriaRiego.productor.nombreUsuario,
      this.asesoriaRiego.fechaEstimadaAplicacionParsed);
      
    console.log(modificarAsesoria);
    this.asesoriaService.modificarAsesoriaRiego(id,modificarAsesoria).toPromise().then(
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

  async cargarUsuario(nombreUsuario: string): Promise<void>{
    await  this.usuarioPorRol.listarUsuarioPorRol(nombreUsuario).subscribe(
      data => {
        this.usuarios=data;
        this.loading=false;
      },
      err => {
        console.log(err);
      }
    );

  }


  cerrar(): void {
    this.location.back();
  }


  listarFincasPorNombreProductor():void{
    const productor = document.querySelector('#dueñoProductor') as HTMLSelectElement;
    productor.addEventListener('click', event =>{
      event.preventDefault();
      console.log(productor.value)
      this.fincaService.listarFincaPorUsuario(productor.value).subscribe(
        data =>{
          this.fincas=data;
        },
        err =>{
          console.log(err);
        }
      )

    })
  }

   listarCuadrosPorFinca(): void{
    const valor = document.querySelector('#nomreFinca') as HTMLSelectElement;
    valor.addEventListener('click',event =>{
      event.preventDefault();
      console.log(valor.value)
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
