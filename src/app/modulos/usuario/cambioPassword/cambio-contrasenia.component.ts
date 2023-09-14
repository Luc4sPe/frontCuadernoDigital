import { Component, OnInit } from '@angular/core';
import { CambioPasswordDto } from 'src/app/Core/dto/cambio-password-dto';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { MenuItem } from 'primeng/api';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambio-contrasenia',
  templateUrl: './cambio-contrasenia.component.html',
  styleUrls: ['./cambio-contrasenia.component.css']
})
export class CambioContraseniaComponent implements OnInit {
  

  msj: string ='';
  usuario : Usuario | any;
  cambiarPasswordDto : CambioPasswordDto = new CambioPasswordDto();
  home : MenuItem = {};
  items : MenuItem[] = [];
  
  constructor(
    private tokenServoce: TokenService,
    private usuarioService: UsuarioService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {

    if(!this.tokenServoce.isLogged()){
      this.router.navigate(['/login']);
    }

    this.cargarItems();
    this.obtenerUsuario();

  }

  
  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label:'Perfil'},
      {label:'Cambiar contraseña',disabled:true}
    ];
   
  }

 

  volver(){
    this.location.back();
  }
  
  existeToken():void{
    if(!this.tokenServoce.getToken()){
      this.router.navigate(['/login']);
    }    

  }

  cambioPassword(form: NgForm):void{
      Swal.fire({
      title: '¿Deseas cambiar la contraseña?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       Swal.showLoading(Swal.getDenyButton());
        this.solicitarCambioPassword(form);
      } 
    })
      
  }

  solicitarCambioPassword(form : NgForm):void{
  
    this.usuarioService.cambiarPassword(this.usuario.id, this.cambiarPasswordDto).subscribe(
      data => {
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title:this.msj,
          text:'Recuerda tu nueva contraseña para tu próximo inicio de sesión, la sesion se cerrara'
        }).then((result) => {
          if(result.isConfirmed || result.dismiss === Swal.DismissReason.esc){
            this.tokenServoce.logOut();
          }
        });
        form.resetForm();
      }, 
      err => {
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title: 'No se guardó la nueva contraseña',
          text: this.msj
          
        })
      }
    )
  }


  obtenerUsuario():void{
    let nombreUsuario : any = this.tokenServoce.getUserName();
    console.log(nombreUsuario);
    this.usuarioService.usuarioPorNombreUsuario(nombreUsuario).subscribe(
      data => {
        this.usuario = data;        
      },
      err => {
        this.msj = err.error.mensaje;
        
      }
    )
  }

}
