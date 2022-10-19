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
  loading : boolean = false;
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
    this.listadoPlantacionDeUnaFinca();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Plantacion', routerLink:'/index'},
      {label: 'Listado', disabled:true}
    ];
  }

  async listarFincasPorNombre(nombreUsuairo: string): Promise<void>{
    await this.fincaService.listarFincaPorUsuario(nombreUsuairo).subscribe(
      data =>{
        this.fincas= data;
        console.log(this.fincas);
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
      console.log('este es el valor'+valor.value);
      this.plantacionServi.listarPlantacionPorFinca(<number><unknown>valor.value).subscribe(
        data =>{
          this.listadoPlantacion = data;
          console.log(this.listadoPlantacion);
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
