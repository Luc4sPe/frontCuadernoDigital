import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { Riego } from '../Core/modelo/riego';
import { Usuario } from '../Core/modelo/usuario';
import { RiegoService } from '../service/riego.service';
import { TokenService } from '../service/token.service';
import { UsuarioService } from '../service/usuario.service';
import {PrimeIcons,MenuItem} from 'primeng/api';
import {MessageService} from 'primeng/api';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  roles: string[]=[];
  isLogged = false;
  isEncargadoAgri = false;

  riegos: Riego []=[];
  nombreUsuario: any;
  usuario: Usuario | any;
  isAdmin = false;
  isUser = false;
  isEncargadoAgricola = false;
  isProductor = false;
  isGerente = false;
  minuscula:any;
  conversion:any;

  nombre:String = 'ROLE_PRODUCTOR';
  items: MenuItem[];


  

  constructor(private route: ActivatedRoute, private tokenService: TokenService, private usuarioService: UsuarioService,private riegoService: RiegoService ) { }

  ngOnInit(): void {


 //obtengo la primera letra del nombre en mayuscula
 this.nombreUsuario = this.tokenService.getUserName()!.charAt(0).toLocaleUpperCase();
 //obtengo el nombre completo  variable minuscula
 this.minuscula=this.tokenService.getUserName();
 //concateno la primera letra en mayuscula, y con slice se toma el nombre apartir del segundo caracter en minuscula para formar el nombre
 this.conversion= this.nombreUsuario+this.minuscula.slice(1)   



  this.nombreUsuario =  this.tokenService.getUserName();
  this.isAdmin = this.tokenService.isAdmin();
  this.isEncargadoAgricola = this.tokenService.isEncargadoAgricola();
  this.isProductor = this.tokenService.isProductor();
  this.isGerente = this.tokenService.isGerente();
  this.cargarItems();
  
    //  this.roles=this.tokenService.getAuthorities();

    // this.roles.forEach(rol =>{
    //   if(rol === 'ROLE_ADMIN'){
    //     this.isAdmin=true;
    //   } 

    //   if(rol=== 'ROLE_ENCARGADO_AGRICOLA'){
    //     this.isEncargadoAgri=true;
    //   }

    //   if(rol=== 'PRODUCTOR'){

    //       this.isProductor=true;

    //   }
    // });

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

 
 
  cargarItems():void{
    this.items=[
    {label: 'Perfil', icon: 'pi pi-times'},
    {separator: true},
   
    {label: 'Contraseña', icon:"pi-key", routerLink: ['/usuario/perfil/cambioContrasenia']},
    {separator: true}

  
    ];
} 



}
