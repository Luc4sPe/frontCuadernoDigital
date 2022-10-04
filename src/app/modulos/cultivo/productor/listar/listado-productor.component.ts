import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api/menuitem';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { CultivoService } from 'src/app/service/cultivo.service';
import { TokenService } from 'src/app/service/token.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-listado-productor',
  templateUrl: './listado-productor.component.html',
  styleUrls: ['./listado-productor.component.css']
})
export class ListadoProductorComponent implements OnInit {

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


  constructor(private cultivoSer: CultivoService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioServ: UsuarioService,) { }

  ngOnInit(): void {
    
    this.cargarUsuario("ROLE_PRODUCTOR");
  }

 



  async cargarUsuario(nombreUsuario: string): Promise<void>{
    await  this.cultivoSer.listarUsuarioPorRol(nombreUsuario).subscribe(
      data => {
        this.usuarios=data;
        this.loading=false;
      },
      err => {
        console.log(err);
      }
    );

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
        this.cargarUsuario("ROLE_PRODUCTOR");
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
        this.cargarUsuario("ROLE_PRODUCTOR");
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

