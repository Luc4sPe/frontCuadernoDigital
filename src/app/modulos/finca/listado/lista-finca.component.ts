import { Component, OnInit } from '@angular/core';
import { Finca } from 'src/app/Core/modelo/finca';
import { MenuItem } from 'primeng/api';
import { FincaService } from 'src/app/service/finca.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-lista-finca',
  templateUrl: './lista-finca.component.html',
  styleUrls: ['./lista-finca.component.css']
})
export class ListaFincaComponent implements OnInit {
  fincas:Finca []=[];
  msj: string;
  loading : boolean = true;
  fincasFiltradas: Finca [];
  home : MenuItem = {}
  items : MenuItem[] = [];
  constructor(private fincaService: FincaService) { }

  ngOnInit(): void {
    this.cargarItems();
    this.cargarFincas();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Finca'},
      {label: 'Listado', disabled:true}
    ];
  }

  
  cargarFincas(): void{

    this.fincaService.listar().subscribe(
      data =>{
        this.fincas = data;
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
  obtenerUsuariosFiltrados(table: Table): void {
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
