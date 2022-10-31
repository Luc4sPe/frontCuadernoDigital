import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Table } from 'primeng/table';
import { Cultivo } from 'src/app/Core/modelo/cultivo';
import { CultivoService } from 'src/app/service/cultivo.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-lista-cultivo',
  templateUrl: './lista-cultivo.component.html',
  styleUrls: ['./lista-cultivo.component.css']
})
export class ListaCultivoComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  msj: string;
  loading : boolean = true;
  cultivos:Cultivo[];
  cultivosFiltrados:Cultivo[];
  isEncargadoAgricola: boolean = false;
  isProductor: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private cultivoServi:CultivoService,
    private tokenService:TokenService) { }

  ngOnInit(): void {
    this.cargarItems();
    this.listarCultivo();
  }

  cargarItems(): void {
    this.isEncargadoAgricola = this.tokenService.isEncargadoAgricola();
    this.isProductor = this.tokenService.isProductor();
    this.isAdmin = this.tokenService.isAdmin();

    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Cultivo', routerLink:'/index'},
      {label: 'Listado', disabled:true}
    ];
  }


  listarCultivo():void{
    this.cultivoServi.listarCultivo().subscribe(
      data =>{
        this.cultivos=data;
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
    this.cultivosFiltrados = table.filteredValue != null ? table.filteredValue : this.cultivos;
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
