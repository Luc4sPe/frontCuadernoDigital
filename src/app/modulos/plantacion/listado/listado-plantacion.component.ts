import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api/menuitem';
import { Finca } from 'src/app/Core/modelo/finca';
import { FincaService } from 'src/app/service/finca.service';
import { TokenService } from 'src/app/service/token.service';
import { Plantacion } from 'src/app/Core/modelo/plantacion';
import { PlantacionService } from 'src/app/service/plantacion.service';

@Component({
  selector: 'app-listado-plantacion',
  templateUrl: './listado-plantacion.component.html',
  styleUrls: ['./listado-plantacion.component.css']
})
export class ListadoPlantacionComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  fincas: Finca[];
  listadoPlantacion: Plantacion[];
  plantacionFiltrada:Plantacion[];
  usuarioProductor:any;
  loading : boolean = true;
  isProductor: boolean = false;

  constructor(
    private fincaService:FincaService,
    private tokenService:TokenService,
    private plantacionServi:PlantacionService
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
      {label: 'Plantacion', routerLink:'/index'},
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
      this.plantacionServi.listarPlantacionPorFinca(<number><unknown>valor.value).subscribe(
        data =>{
          this.listadoPlantacion = data;
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
    this.plantacionFiltrada = table.filteredValue != null ? table.filteredValue : this.listadoPlantacion;
  }

}
