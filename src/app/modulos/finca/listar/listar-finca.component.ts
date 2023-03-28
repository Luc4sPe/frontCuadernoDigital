import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { MenuItem } from 'primeng/api/menuitem';
import { Table } from 'primeng/table';
import { FincaService } from 'src/app/service/finca.service';
import { Finca } from 'src/app/Core/modelo/finca';
@Component({
  selector: 'app-listar-finca',
  templateUrl: './listar-finca.component.html',
  styleUrls: ['./listar-finca.component.css']
})
export class ListarFincaComponent implements OnInit {
  isEncargadoAgricola: boolean = false;
  isProductor: boolean = false;
  isAdmin: boolean = false;
  home : MenuItem = {}
  items : MenuItem[] = [];
  msj: string;
  fincas:Finca[];
  fincasFiltradas:Finca[];
  loading : boolean = true;
  constructor(
    private tokenService:TokenService,
    private fincaService:FincaService
  ) { }

  ngOnInit(): void {
    this.isEncargadoAgricola = this.tokenService.isEncargadoAgricola();
    this.isProductor = this.tokenService.isProductor();
    this.isAdmin = this.tokenService.isAdmin();
    this.cargarItems();
    this.listarFinca();
  }


  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Finca', routerLink:'/index'},
      {label: 'Listado', disabled:true}
    ];
  }

  listarFinca():void{
    this.fincaService.listar().subscribe(
      data =>{
        this.fincas=data;
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

  obtenerCultivosFiltrados(table: Table): void {
    this.fincasFiltradas = table.filteredValue != null ? table.filteredValue : this.fincas;
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
