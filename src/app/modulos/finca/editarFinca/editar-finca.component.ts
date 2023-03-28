import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Finca } from 'src/app/Core/modelo/finca';
import { FincaService } from 'src/app/service/finca.service';
import { ModificarFincaDto } from 'src/app/Core/dto/modificar-finca-dto';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { CultivoService } from 'src/app/service/cultivo.service';
@Component({
  selector: 'app-editar-finca',
  templateUrl: './editar-finca.component.html',
  styleUrls: ['./editar-finca.component.css']
})
export class EditarFincaComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  msj: string;
  finca: Finca | any;
  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  usuarios: Usuario[]=[];
  loading : boolean = true;
  
  constructor(
    private router: Router,
    private location : Location,
    private activatedRoute: ActivatedRoute,
    private fincaService: FincaService,
    private cultivoServi: CultivoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.cargarUsuario("ROLE_PRODUCTOR");
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerFinca(id);
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Finca'},
      {label:'Modificar datos', disabled:true}
    ];
    
  }

  obtenerFinca(id:number):void{
    this.fincaService.datalle(id).toPromise().then(
      data =>{
        this.finca=data;

      }, 
       err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        this.router.navigate(["/finca/listadoFinca"]);
      }
    
    ); 
    
  }

  solitarModificacionFinca(form: NgForm):void{
    Swal.fire({
      title: '¿Deseas editar los datos de la finca?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: 'Cancelar'
      
    }).then((result) => {
    
      if (result.isConfirmed) {
        this.actualizarFinca(form);
      } 
    })
  }


  actualizarFinca(form: NgForm):void{

    const id = this.activatedRoute.snapshot.params.id;
    const modificarFinca = new ModificarFincaDto(this.finca.nombre,this.finca.direccion,this.finca.productor.nombreUsuario);
    this.fincaService.actualizarFinca(id,modificarFinca).toPromise().then(
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

  cerrar(): void {
    this.location.back();
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
