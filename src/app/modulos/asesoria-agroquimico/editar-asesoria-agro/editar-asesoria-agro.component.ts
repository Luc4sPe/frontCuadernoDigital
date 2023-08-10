import { Component, OnInit } from '@angular/core';
import { AsesoriaAgroquimico } from 'src/app/Core/modelo/asesoria-agroquimico';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { Finca } from 'src/app/Core/modelo/finca';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import { ModificarAgroquimicoDto } from 'src/app/Core/dto/modificar-agroquimico-dto';
import { AsesoriaAgroquimicoService } from 'src/app/service/asesoria-agroquimico.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FincaService } from 'src/app/service/finca.service';
import { CuadroService } from 'src/app/service/cuadro.service';
import Swal from 'sweetalert2';
import { ModificarAsesoriaAgroquimicoDto } from 'src/app/Core/dto/modificar-asesoria-agroquimico-dto';
import { Agroquimico } from 'src/app/Core/modelo/agroquimico';
import { AgroquimicoService } from 'src/app/service/agroquimico.service';

@Component({
  selector: 'app-editar-asesoria-agro',
  templateUrl: './editar-asesoria-agro.component.html',
  styleUrls: ['./editar-asesoria-agro.component.css']
})
export class EditarAsesoriaAgroComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  asesoriaAgroqui: AsesoriaAgroquimico | any;
  msj: string;
  usuarios: Usuario[]=[];
  loading : boolean = true;
  fincas: Finca[]=[];
  cuadros: Cuadro[];
  modificarAsesoria = <ModificarAgroquimicoDto>{}
  listadoAgroquimico: Agroquimico[];
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"


  constructor(
    private asesoriaService: AsesoriaAgroquimicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location : Location,
    private usuarioPorRol: UsuarioService,
    private fincaService: FincaService,
    private cuadroService: CuadroService,
    private agroquimicoService: AgroquimicoService,
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerAsesoria(id);
    this.cargarUsuario("ROLE_PRODUCTOR");
    this.listarFincasPorNombreProductor();
    this.listarCuadrosPorFinca();
    this.listarAgroquimicos();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Asesoría agroquímico'},
      {label:'Modificar datos', disabled:true}
    ];
    
  }

  obtenerAsesoria(id:number):void{
    this.asesoriaService.obtenerAsesoria(id).toPromise().then(
      (data) =>{
        this.asesoriaAgroqui=data;
        this.asesoriaAgroqui.fechaEstimadaAplicacionParsed = new Date (this.asesoriaAgroqui.fechaEstimadaAplicacionParsed);
       
      }, 
       err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        this.router.navigate(["/asesoramientoRiego/listaAsesoria"]);
      }
   
    ); 
   
  }

  solitarModificacionAsesoria(form: NgForm):void{
   
    Swal.fire({
      title: '¿Deseas editar los datos de la asesoría?',
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
    const modificarAsesoria = new ModificarAsesoriaAgroquimicoDto (this.asesoriaAgroqui.agroquimico.id,this.asesoriaAgroqui.cuadro.idCuadro,this.asesoriaAgroqui.dosisPorHectaria,
      this.asesoriaAgroqui.dosisPorHl,this.asesoriaAgroqui.volumenPorHectaria, this.asesoriaAgroqui.objetivo, this.asesoriaAgroqui.plaga,this.asesoriaAgroqui.fechaEstimadaAplicacionParsed,
      this.asesoriaAgroqui.finca.idFinca, this.asesoriaAgroqui.productor.nombreUsuario);
    this.asesoriaService.modificarAsesoriaAgro(id,modificarAsesoria).toPromise().then(
      data =>{
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title:this.msj,
          text:'Datos actualizados correctamente'
        });
        form.resetForm();
       this.router.navigate(['/asesoramientoAgroquimico/listaAsesoriaAgroquimico']);
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






}
