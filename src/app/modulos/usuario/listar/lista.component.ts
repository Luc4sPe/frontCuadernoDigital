import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Core/modelo/usuario';

import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[]=[];
  msj: string='';
  loading : boolean = true;
  roles: string[]=[];
  anuncio : string = '';
  isAdmin = false;
  isLoged=false;

  usuariosFiltrados: Usuario[] = [];
  home : MenuItem = {}
  items : MenuItem[] = [];


  constructor(private usuarioServ: UsuarioService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.cargaUsuario();
    this.cargarItems();
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
        this.usuarios = data;
        this.loading=false;
      },

      err => {
        console.log(err);
      }
    );

    // this.usuarioServ.listar().toPromise().then(
    //   data => {
    //     this.usuarios = data.filter(u => u.nombreUsuario != 'admin');
    //     this.loading = false;
    //     this.usuarios.forEach(usuario => {usuario.fechaDeAlta = new Date(usuario.fechaDeAlta)});
    //   },
    //   err => {
    //     console.log(err.error);
        
    //   }
    // )
    /*   this.usuarioServ.listar().subscribe(
      data =>{
        this.usuarios=data;
        this.loading=false;
      },

      err => {
        console.log(err);
      }
    );

  }*/
}

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label:'Usuarios'},
      {label:'Listado', disabled:true}
    ]
    
  }

  getSeverityByEstado(usuario : Usuario): string {
    const serverityByEstado : {[key: string]: string} = {
      true : 'success',
      false: 'danger'
    };
    return serverityByEstado[`${usuario.estadoActivo}`];
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

  clear(table : Table){
    table.clear();
  }

  exportarPdf(table : Table){
    this.obtenerUsuariosFiltrados(table);
    this.usuariosFiltrados = this.usuarios;
    this.obtenerFiltros(table);

  }

  exportarExcel(table: Table){
    this.obtenerUsuariosFiltrados(table);
    this.obtenerFiltros(table);
  }

  obtenerUsuariosFiltrados(table: Table): void {
    this.usuariosFiltrados = table.filteredValue != null ? table.filteredValue : this.usuarios;
  }

  obtenerFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
    
    

  }

  

}
