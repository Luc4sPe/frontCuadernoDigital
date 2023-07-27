import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AsesoriaRiego } from 'src/app/Core/modelo/asesoria-riego';
import { Finca } from 'src/app/Core/modelo/finca';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';
import { FincaService } from 'src/app/service/finca.service';
import { TokenService } from 'src/app/service/token.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  loading : boolean = true;
  isProductor: boolean = false;
  usuarioProductor:any;
  fincas: Finca[];
  listadoAsesoria: AsesoriaRiego[];
  asesoriaFiltrados:AsesoriaRiego[];
  constructor(
    private tokenService: TokenService,
    private asesoriaService:AsesoriaRiegoService,
    private fincaService : FincaService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.isProductor=this.tokenService.isProductor();
    this.usuarioProductor=this.tokenService.getUserName()
    this.listarFincasPorNombre(this.usuarioProductor);
    this.listadoAsesoriaDeUnaFinca();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Asesoria Riego', routerLink:'/index'},
      {label: 'Listado asesoria riego', disabled:true}
    ];
  }

  listarFincasPorNombre(nombreUsuairo: string): void{
     this.fincaService.listarFincaPorUsuario(nombreUsuairo).subscribe(
    
      data =>{
        this.fincas= data;
      },
      err =>{
        console.log(err);
      }
    )
    
  }


  listadoAsesoriaDeUnaFinca(): void{
    const valor = document.querySelector('#nomreFinca') as HTMLSelectElement;
    console.log(valor);
    valor.addEventListener('click',event =>{
      event.preventDefault();
      this.asesoriaService.listarAsesoriaPorFinca(<number><unknown>valor.value).subscribe(
        data =>{
          this.listadoAsesoria = data;
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

  obtenerAsesoriaFiltradas(table: Table): void {
    this.asesoriaFiltrados = table.filteredValue != null ? table.filteredValue : this.listadoAsesoria;
  }

  obtenerFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }

  refrescar():void{
    window.location.reload();
  }


}
