import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Finca } from 'src/app/Core/modelo/finca';
import { LaborSuelo } from 'src/app/Core/modelo/labor-suelo';
import { FincaService } from 'src/app/service/finca.service';
import { LaborSueloService } from 'src/app/service/labor-suelo.service';
import { TokenService } from 'src/app/service/token.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-lista-labor-suelo',
  templateUrl: './lista-labor-suelo.component.html',
  styleUrls: ['./lista-labor-suelo.component.css']
})
export class ListaLaborSueloComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  fincas: Finca[];
  usuarioProductor:any;
  loading : boolean = true;
  isProductor: boolean = false;
  listadoLabor: LaborSuelo[];
  laborFiltrada:LaborSuelo[];

  constructor(
    private fincaService:FincaService,
    private tokenService:TokenService,
    private laborService:LaborSueloService,
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.isProductor=this.tokenService.isProductor();
    this.usuarioProductor=this.tokenService.getUserName();
    this.listarFincasPorNombre(this.usuarioProductor);
   
    
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Labor Suelo', routerLink:'/index'},
      {label: 'Listado', disabled:true}
    ];
  }

  listarFincasPorNombre(nombreUsuairo: string): void{
    this.fincaService.listarFincaPorUsuario(nombreUsuairo).subscribe(
      data =>{
        this.fincas= data;
        this.listadoPlantacionDeUnaFinca();
      },
      err =>{
        console.log(err);
      }
    )
    
  }


  listadoPlantacionDeUnaFinca(): void{
    const valor = document.querySelector('#nomreFinca') as HTMLSelectElement;
    valor.addEventListener('click',event =>{
      event.preventDefault();
      this,this.laborService.listarLaborSueloPorFinca(<number><unknown>valor.value).subscribe(
        data =>{
          this.listadoLabor = data;
          this.loading=false;
        },
        err =>{
          console.log(err);
        }
        
      )
     
     })
   
  } 

  clear(table : Table){
    table.clear();
  }

  obtenerPlantacionFiltrados(table: Table): void {
    this.laborFiltrada = table.filteredValue != null ? table.filteredValue : this.listadoLabor;
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
