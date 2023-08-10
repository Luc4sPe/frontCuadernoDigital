import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { AsesoriaAgroquimicoDto } from 'src/app/Core/dto/asesoria-agroquimico-dto';
import { Agroquimico } from 'src/app/Core/modelo/agroquimico';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { Finca } from 'src/app/Core/modelo/finca';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { AgroquimicoService } from 'src/app/service/agroquimico.service';
import { AsesoriaAgroquimicoService } from 'src/app/service/asesoria-agroquimico.service';
import { CuadroService } from 'src/app/service/cuadro.service';
import { FincaService } from 'src/app/service/finca.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-asesoria-agro',
  templateUrl: './nueva-asesoria-agro.component.html',
  styleUrls: ['./nueva-asesoria-agro.component.css']
})
export class NuevaAsesoriaAgroComponent implements OnInit {

  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  home : MenuItem = {}
  items : MenuItem[] = [];
  nuevaAsesoria: AsesoriaAgroquimicoDto = new AsesoriaAgroquimicoDto;

  msj: string;
  usuarios: Usuario[]=[];
  loading : boolean = true;
  fincas: Finca[];
  cuadros: Cuadro[];
  listadoAgroquimico: Agroquimico[];
  fechaEstimada: Date = new Date();
  fechaActual : Date = new Date();
  

  constructor(

    private asesoriaService: AsesoriaAgroquimicoService,
    private usuarioPorRol: UsuarioService,
    private fincaService: FincaService,
    private cuadroService: CuadroService,
    private router: Router,
    private agroquimicoService: AgroquimicoService

  ) { }

  ngOnInit(): void {

    this.cargarItems();
    this.cargarUsuario("ROLE_PRODUCTOR");
    this.listarFincasPorNombreProductor();
    this.listarCuadrosPorFinca();
    this.listarAgroquimicos();
  }


  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Asesoría Agroquímico'},
      {label: 'Nueva asesoría', disabled:true}
    ];
  }


  crearAsesoria(form: NgForm): void{
    this.nuevaAsesoria.fechaEstimadaAplicacion = this.fechaEstimada.toISOString().split("T")[0];
    Swal.fire({
      title:'¿Crear una nueva asesoría?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'question'      
    }).then((result) => {
      if(result.isConfirmed){
        this.soliciotacionCrearAsesoria(form)
      }
    });

  }

  soliciotacionCrearAsesoria(form: NgForm): void{
    this.asesoriaService.crearAsesoriaAgroquimico(this.nuevaAsesoria).subscribe(
      data=>{
        this.msj=data.mensaje;
        Swal.fire({
          icon: 'success',
          title: this.msj,
          text: '',
          
       
        });

        form.resetForm();
        this.router.navigate(['/asesoramientoAgroquimico/listaAsesoriaAgroquimico']);
        
      },
      err =>{
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title:'Error al crear la asesoria',
          text: this.msj,
          
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

  listarFincasPorNombreProductor():void{
    const productor = document.querySelector('#nombreProductor') as HTMLSelectElement;
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
