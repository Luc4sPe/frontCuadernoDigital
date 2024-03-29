import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { MenuItem } from 'primeng/api';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { PerfilUsuarioDto } from 'src/app/Core/dto/perfil-usuario-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-perfil',
  templateUrl: './actualizar-perfil.component.html',
  styleUrls: ['./actualizar-perfil.component.css']
})
export class ActualizarPerfilComponent implements OnInit {

  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"

  usuario : Usuario | any;
  msj : string;
  home : MenuItem = {}
  items : MenuItem[] = [];
  constructor(
    private tokenService : TokenService, 
    private router : Router, 
    private location : Location,
    private usuarioService : UsuarioService
    ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.obtenerUsuario();
  }
 
  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Perfil'},
      {label:'Actualizar datos', disabled:true}
    ];
   
  }

  volver(): void {
    this.location.back();
  }

  actualizarPerfil():void{
    const perfilActualizar = new PerfilUsuarioDto(this.usuario.nombre,this.usuario.apellido,this.usuario.dni,this.usuario.nombreUsuario, this.usuario.email,this.usuario.telefono);
    Swal.fire({
      title: '¿Deseas editar tus datos?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
    
      if (result.isConfirmed) {
        this.solicitudActualizacionPerfil(this.usuario.id, perfilActualizar);
      } 
    })
    
  }
  solicitudActualizacionPerfil(id: number,perfilActualizar: PerfilUsuarioDto ){
   
    this.usuarioService.actualizarPerfil(id, perfilActualizar).subscribe(
      data => {
        this.msj = data.mensaje;
        Swal.fire('Datos guardados correctamente', 'Debes iniciar sesión nuevamente', 'success').then((result) => {
          if(result.isConfirmed || result.dismiss === Swal.DismissReason.esc){
            this.tokenService.logOut();
          }
        });
        //form.resetForm();
        //this.router.navigate(['/index']);
        
      }, 
      err => {
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title: 'No se actualizaron los datos',
          text: this.msj
          
        })
      }
    )
  }


  obtenerUsuario():void{
    let nombreUsuario : any = this.tokenService.getUserName();
    this.usuarioService.usuarioPorNombreUsuario(nombreUsuario).subscribe(
      data => {
        this.usuario = data;        
      },
     
      err => {
        Swal.fire('Error', err.error.mensaje, 'error');
        this.router.navigate(["index"]);
      }
    
    );
  }


 
}
