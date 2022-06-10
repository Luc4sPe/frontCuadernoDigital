import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/dto/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: any[]=[];
  roles: string[]=[];
  anuncio : string = '';
  isAdmin = false;
  isLoged=false;


  constructor(private usuarioServ: UsuarioService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.cargaUsuario();
    this.roles=this.tokenService.getAuthorities();
    this.isLoged=true;
    this.roles.forEach(rol =>{
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin=true;
      } 
    });

  }

  cargaUsuario(): void{
  
      this.usuarioServ.listar().subscribe(
      data =>{
        this.usuarios=data;
      },

      err => {
        console.log(err);
      }
    );

  }


 

  altaUsuario(id: number):void {
    /*solicito el alta al backend */
    this.usuarioServ.altaUsuario(id).subscribe(
      (data) => {
        this.anuncio = data.mensaje;
        //this.cargaUsuario();
        Swal.fire('Usuario Activo', this.anuncio, 'success');
        this.cargaUsuario();
      }, 
      (err) => {
        this.anuncio = err.error.mensaje;
        Swal.fire('Error al dar de alta', this.anuncio, 'error')

      })
  }


  bajaUsuario(id: number): void {

    /*solicito baja al backend */
    this.usuarioServ.bajaUsuario(id).subscribe(
      (data) => {
        this.anuncio = data.mensaje;
        //this.cargaUsuario();
        Swal.fire('Usuario Inactivo', this.anuncio, 'success');
        this.cargaUsuario();
      }, 
      (err) => {
        this.anuncio = err.error.mensaje;
        Swal.fire('Error al dar de baja', this.anuncio, 'error')

      })

  }

  

}
