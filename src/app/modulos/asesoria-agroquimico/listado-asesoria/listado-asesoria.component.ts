import { Component, OnInit } from '@angular/core';
import { AsesoriaAgroquimico } from 'src/app/Core/modelo/asesoria-agroquimico';
import { MenuItem } from 'primeng/api/menuitem';
import { Table } from 'primeng/table';
import { TokenService } from 'src/app/service/token.service';
import { AsesoriaAgroquimicoService } from 'src/app/service/asesoria-agroquimico.service';

@Component({
  selector: 'app-listado-asesoria',
  templateUrl: './listado-asesoria.component.html',
  styleUrls: ['./listado-asesoria.component.css']
})
export class ListadoAsesoriaComponent implements OnInit {


  home : MenuItem = {}
  items : MenuItem[] = [];
  loading : boolean = true;
  asesorias: AsesoriaAgroquimico[];
  asesoriaFiltrados:AsesoriaAgroquimico[];
  isEncargadoAgricola: boolean = false;
  isProductor: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private tokenService: TokenService,
    private asesoriaService:AsesoriaAgroquimicoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.isEncargadoAgricola = this.tokenService.isEncargadoAgricola();
    this.isAdmin = this.tokenService.isAdmin();
    this.listarAsesoria();
  }


  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Asesoría agroquímico', routerLink:'/index'},
      {label: 'Listado', disabled:true}
    ];
  }

  listarAsesoria():void{
    this.asesoriaService.listarAsesoria().subscribe(
      data =>{
        this.asesorias=data
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

  obtenerAsesoriaFiltradas(table: Table): void {
    this.asesoriaFiltrados = table.filteredValue != null ? table.filteredValue : this.asesorias;
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
