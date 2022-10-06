import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TokenService } from '../../../service/token.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  nombreUsuario: any = '' ;
  isLogged = false;

 roles : string[] = [];

  isAdmin = false;
  isUser = false;
  isProctor = false;
  isGerente = false;
  isEncargadoAgricola = false;
  nombre:string;
  minuscula:any;
  conversion:any;

  

  constructor(private tokenService: TokenService, private router: Router, 
    private usuarioService: UsuarioService,) { }

  ngOnInit(): void {

    //obtengo la primera letra del nombre en mayuscula
    this.nombreUsuario = this.tokenService.getUserName()!.charAt(0).toLocaleUpperCase();
    //obtengo el nombre completo  variable minuscula
    this.minuscula=this.tokenService.getUserName();
    //concateno la primera letra en mayuscula, y con slice se toma el nombre apartir del segundo caracter en minuscula para formar el nombre
    this.conversion= this.nombreUsuario+this.minuscula.slice(1)
 
    this.obtenerRolesDelUsuario();

    if (this.tokenService.getToken()) {
        this.isLogged = true;
        //this.nombreUsuario = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
  
  }

  public obtenerRolesDelUsuario():void{
    this.roles = this.tokenService.getAuthorities();
    this.isAdmin = this.tokenService.isAdmin();
    this.isEncargadoAgricola = this.tokenService.isEncargadoAgricola();
    this.isUser = this.tokenService.isUser();
    this.isProctor = this.tokenService.isProductor();
    this.isGerente = this.tokenService.isGerente();
  }
}
