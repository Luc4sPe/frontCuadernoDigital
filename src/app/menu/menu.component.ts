import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../Core/dto/usuario';
import { TokenService } from '../service/token.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  roles: string[]=[];
  isLogged = false;
  isEncargadoAgri = false;


  nombreUsuario: any;
  usuario: Usuario | any;
  isAdmin = false;
  isUser = false;
  isEncargadoAgricola = false;
  isProductor = false;
  isGerente = false;
  

  constructor(private tokenService: TokenService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

  this.nombreUsuario =  this.tokenService.getUserName();
  this.isAdmin = this.tokenService.isAdmin();
  this.isUser = this.tokenService.isUser();
  this.isEncargadoAgricola = this.tokenService.isEncargadoAgricola();
  this.isProductor = this.tokenService.isProductor();
  this.isGerente = this.tokenService.isGerente();

    
    
   
    this.roles=this.tokenService.getAuthorities();

    this.roles.forEach(rol =>{
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin=true;
      } 

      if(rol=== 'ROLE_ENCARGADO_AGRICOLA'){
        this.isEncargadoAgri=true;
      }

      if(rol=== 'PRODUCTOR'){

          this.isProductor=true;

      }
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  

  onLogOut(): void {
    this.tokenService.logOut();
   // window.location.reload();

    Swal.fire({
      icon: 'success',
      title: 'Cerraste sesion correctamente!'
    })
  }

}
