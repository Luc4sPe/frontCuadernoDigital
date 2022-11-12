import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { Riego } from 'src/app/Core/modelo/riego';
import { RiegoService } from 'src/app/service/riego.service';
import { TokenService } from 'src/app/service/token.service';
import { Finca } from 'src/app/Core/modelo/finca';
import { FincaService } from 'src/app/service/finca.service';

@Component({
  selector: 'app-listar-riego',
  templateUrl: './listar-riego.component.html',
  styleUrls: ['./listar-riego.component.css']
})
export class ListarRiegoComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  fincas: Finca[];
  usuarioProductor:any;
  loading : boolean = false;
  isProductor: boolean = false;
  listadoRiego: Riego[];
  riegoFiltrado:Riego[];

  constructor(
    private fincaService:FincaService,
    private tokenService:TokenService,
    private riegoService: RiegoService,
    
   ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.isProductor=this.tokenService.isProductor();
    this.usuarioProductor=this.tokenService.getUserName();
    this.listarFincasPorNombre(this.usuarioProductor);
    this.listadoRiegoDeUnaFinca();
  
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Riego', routerLink:'/index'},
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

  listadoRiegoDeUnaFinca(): void{
    const valor = document.querySelector('#nomreFinca') as HTMLSelectElement;
    valor.addEventListener('click',event =>{
      event.preventDefault();
      this.riegoService.listarRiegoPorFinca(<number><unknown>valor.value).subscribe(
        data =>{
          this.listadoRiego = data;
          //console.log(this.listadoLabor);
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
    this.riegoFiltrado = table.filteredValue != null ? table.filteredValue : this.listadoRiego;
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
