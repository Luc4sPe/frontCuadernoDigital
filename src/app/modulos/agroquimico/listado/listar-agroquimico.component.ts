import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Table } from 'primeng/table';
import { Agroquimico } from 'src/app/Core/modelo/agroquimico';
import { AgroquimicoService } from 'src/app/service/agroquimico.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-listar-agroquimico',
  templateUrl: './listar-agroquimico.component.html',
  styleUrls: ['./listar-agroquimico.component.css']
})
export class ListarAgroquimicoComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  msj: string;
  loading : boolean = true;
  agroquimicos: Agroquimico[];
  agroquimicosFiltrados: Agroquimico[];
  isEncargadoAgricola: boolean = false;
  isProductor: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private tokenService:TokenService,
    private AgroService: AgroquimicoService,
  ) { }

  ngOnInit(): void {
    this.isEncargadoAgricola = this.tokenService.isEncargadoAgricola();
    this.isProductor = this.tokenService.isProductor();
    this.isAdmin = this.tokenService.isAdmin();
    this.cargarItems();
    this.listarAgroquimico();

  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Agroquímico', routerLink:'/index'},
      {label: 'Listado', disabled:true}
    ];
  }

  listarAgroquimico():void{
    this.AgroService.listarAgroquimico().subscribe(
      data =>{
        this.agroquimicos=data;
        this.loading=false;
      },
      err => {
        console.log(err.error.mensaje);
      }
    )
  }

  clear(table : Table){
    table.clear();
  }

  obtenerAgroquimicosFiltrados(table: Table): void {
    this.agroquimicosFiltrados = table.filteredValue != null ? table.filteredValue : this.agroquimicos;
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
