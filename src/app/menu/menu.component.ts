import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { Riego } from '../Core/modelo/riego';
import { Usuario } from '../Core/modelo/usuario';
import { RiegoService } from '../service/riego.service';
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

  riegos: Riego []=[];
  nombreUsuario: any;
  usuario: Usuario | any;
  isAdmin = false;
  isUser = false;
  isEncargadoAgricola = false;
  isProductor = false;
  isGerente = false;
  
  items: MenuItem[]=[];
  nombre:String = 'ROLE_PRODUCTOR';

  constructor(private route: ActivatedRoute, private tokenService: TokenService, private usuarioService: UsuarioService,private riegoService: RiegoService ) { }

  ngOnInit(): void {

  this.nombreUsuario =  this.tokenService.getUserName();
  this.isAdmin = this.tokenService.isAdmin();
  this.isUser = this.tokenService.isUser();
  this.isEncargadoAgricola = this.tokenService.isEncargadoAgricola();
  this.isProductor = this.tokenService.isProductor();
  this.isGerente = this.tokenService.isGerente();

  //const nombre = this.route.snapshot.params['ROLE_PRODUCTOR'];
    
  //const nombreUsuairo = this.route.snapshot.params['nombreUsuario'];
       
  // this.listar(nombreUsuairo);
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
    window.location.reload();

    Swal.fire({
      icon: 'success',
      title: 'Cerraste sesion correctamente!'
    })
  }

  cargarItems():void{
    this.items=[

      {
        label:'Productor',
        icon:'pi pi-fw pi-user',
        items:[
           {
              label:'Nuevo',routerLink:'/usuario/nuevo',
              icon:'pi pi-fw pi-user-plus',

           },
           {
              label:'Listar',
              icon:'pi pi-fw pi-file',

           },
              ]
  } ]
}

  /* async listar(nombreUsuairo: string): Promise<void>{
    await  this.riegoService.listarRiegoPorUsuario(nombreUsuairo).subscribe(
      data => {
        this.riegos=data;
      },
      err => {
        console.log(err);
      }
    );

  } */

}
