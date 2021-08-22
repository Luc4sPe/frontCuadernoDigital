import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/modelo/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: any[]=[];
  roles: string[]=[];
  
  isAdmin = false;


  constructor(private authUsuario: AuthService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.cargaUsuario();
    this.roles=this.tokenService.getAuthorities();
    this.roles.forEach(rol =>{
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin=true;
      } 
    });

  }

  cargaUsuario(): void{
    this.authUsuario.listar().subscribe(
      data =>{
        this.usuarios=data;
      },

      err => {
        console.log(err);
      }
    );

  }

  

}
