import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';
import { AsesoriaRiegoDto } from 'src/app/Core/dto/asesoria-riego-dto';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { FincaService } from 'src/app/service/finca.service';
import { Finca } from 'src/app/Core/modelo/finca';
import { CuadroService } from 'src/app/service/cuadro.service';
import { Cuadro } from 'src/app/Core/modelo/cuadro';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nueva-asesoria',
  templateUrl: './nueva-asesoria.component.html',
  styleUrls: ['./nueva-asesoria.component.css']
})
export class NuevaAsesoriaComponent implements OnInit {

  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  home : MenuItem = {}
  items : MenuItem[] = [];
  nuevaAsesoria: AsesoriaRiegoDto = new AsesoriaRiegoDto;
  msj: string;
  usuarios: Usuario[]=[];
  loading : boolean = true;
  fincas: Finca[];
  cuadros: Cuadro[];
  fechaEstimada: Date = new Date();
  fechaActual : Date = new Date();
  

  constructor(
    private asesoriaService: AsesoriaRiegoService,
    private usuarioPorRol: UsuarioService,
    private fincaService: FincaService,
    private cuadroService: CuadroService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.cargarUsuario("ROLE_PRODUCTOR");
    this.listarFincasPorNombreProductor();
    this.listarCuadrosPorFinca();
    
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Asesoria Riego'},
      {label: 'Nueva asesoria', disabled:true}
    ];
  }


  crearAsesoria(form: NgForm): void{
    this.nuevaAsesoria.fechaEstimadaAplicacion = this.fechaEstimada.toISOString().split("T")[0];
    Swal.fire({
      title:'¿Crear una nueva asesoria?',
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
     console.log(this.nuevaAsesoria);
    this.asesoriaService.crearAsesoriaRiego(this.nuevaAsesoria).subscribe(
      data=>{
        console.log(this.nuevaAsesoria);
        this.msj=data.mensaje;
        Swal.fire({
          icon: 'success',
          title: this.msj,
          text: '',
        });

        form.resetForm();
        this.router.navigate(['asesoramientoRiego/listaAsesoria']);
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
