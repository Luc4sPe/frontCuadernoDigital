import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Table } from 'primeng/table';
import { AsesoriaRiego } from 'src/app/Core/modelo/asesoria-riego';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-listar-asesoria',
  templateUrl: './listar-asesoria.component.html',
  styleUrls: ['./listar-asesoria.component.css']
})
export class ListarAsesoriaComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  loading : boolean = true;
  asesorias: AsesoriaRiego[];
  asesoriaFiltrados:AsesoriaRiego[];
  isEncargadoAgricola: boolean = false;
  isProductor: boolean = false;
  isAdmin: boolean = false;
   //optengo fecha y hora actual del sistema
   fechaHoy: Date = new Date();
 

  constructor(
    private tokenService: TokenService,
    private asesoriaService:AsesoriaRiegoService
    
  ) { }

  ngOnInit(): void {

    this.isEncargadoAgricola = this.tokenService.isEncargadoAgricola();
    this.isAdmin = this.tokenService.isAdmin();
    this.cargarItems();
    this.listarAsesoria();
    console.log(this.listarAsesoria());

    
  }


  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Asesoria Riego', routerLink:'/index'},
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
  
  verificarVencimiento(asesoria: any): boolean {
    const fechaHoy = new Date();
    const fechaEstimada = new Date(asesoria.fechaEstimadaAplicacionParsed);
    return asesoria.asesoriaAplicada === false && fechaEstimada > fechaHoy;
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
