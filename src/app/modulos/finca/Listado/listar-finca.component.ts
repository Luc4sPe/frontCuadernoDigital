import { Component, OnInit } from '@angular/core';
import { Finca } from 'src/app/Core/modelo/finca';
import { MenuItem } from 'primeng/api/menuitem';
import { FincaService } from 'src/app/service/finca.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-listar-finca',
  templateUrl: './listar-finca.component.html',
  styleUrls: ['./listar-finca.component.css']
})
export class ListarFincaComponent implements OnInit {

  fincas:Finca []=[];
  msj: string;
  loading : boolean = true;
  fincasFiltradas: Finca [];
  home : MenuItem = {}
  items : MenuItem[] = [];

  constructor(private fincaService: FincaService ) { }

  ngOnInit(): void {
    this.cargarFincas();
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
