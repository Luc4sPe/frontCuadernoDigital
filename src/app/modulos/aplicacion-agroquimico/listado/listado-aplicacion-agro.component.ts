import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { AplicacionAgroquimico } from 'src/app/Core/modelo/aplicacion-agroquimico';
import { Finca } from 'src/app/Core/modelo/finca';
import { AplicacionAgroquimicoService } from 'src/app/service/aplicacion-agroquimico.service';
import { FincaService } from 'src/app/service/finca.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-listado-aplicacion-agro',
  templateUrl: './listado-aplicacion-agro.component.html',
  styleUrls: ['./listado-aplicacion-agro.component.css']
})
export class ListadoAplicacionAgroComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  fincas: Finca[];
  usuarioProductor:any;
  loading : boolean = false;
  isProductor: boolean = false;
  listadoAplicacionAgro: AplicacionAgroquimico[];
  aplicacionAgroFiltrado:AplicacionAgroquimico[];
  
  constructor(
    private fincaService:FincaService,
    private tokenService:TokenService,
    private aplicacioonService:AplicacionAgroquimicoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.isProductor=this.tokenService.isProductor();
    this.usuarioProductor=this.tokenService.getUserName();
    this.listarFincasPorNombre(this.usuarioProductor);
    this.listadoAplicacionAgroDeUnaFinca();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Aplicación agroquímico', routerLink:'/index'},
      {label: 'Listado', disabled:true}
    ];
  }


  async listarFincasPorNombre(nombreUsuairo: string): Promise<void>{
    await this.fincaService.listarFincaPorUsuario(nombreUsuairo).subscribe(
      data =>{
        this.fincas= data;
      },
      err =>{
        console.log(err);
      }
    )
    
  }

  listadoAplicacionAgroDeUnaFinca(): void{
    const valor = document.querySelector('#nomreFinca') as HTMLSelectElement;
    valor.addEventListener('click',event =>{
      event.preventDefault();
      this.aplicacioonService.listarAplicacionAgroPorFinca(<number><unknown>valor.value).subscribe(
        data =>{
          this.listadoAplicacionAgro = data;
      
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
    this.aplicacionAgroFiltrado = table.filteredValue != null ? table.filteredValue : this.listadoAplicacionAgro;
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
