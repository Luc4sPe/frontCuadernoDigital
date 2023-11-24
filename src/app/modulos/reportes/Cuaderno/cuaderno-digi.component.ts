import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Finca } from 'src/app/Core/modelo/finca';
import { Plantacion } from 'src/app/Core/modelo/plantacion';
import { PlantacionService } from 'src/app/service/plantacion.service';
import { LaborSuelo } from 'src/app/Core/modelo/labor-suelo';

import { Usuario } from 'src/app/Core/modelo/usuario';
import { FincaService } from 'src/app/service/finca.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { LaborSueloService } from 'src/app/service/labor-suelo.service';
import { AplicacionAgroquimico } from 'src/app/Core/modelo/aplicacion-agroquimico';
import { AplicacionAgroquimicoService } from 'src/app/service/aplicacion-agroquimico.service';
import { AsesoriaAgroquimico } from 'src/app/Core/modelo/asesoria-agroquimico';
import { AsesoriaAgroquimicoService } from 'src/app/service/asesoria-agroquimico.service';
import { Riego } from 'src/app/Core/modelo/riego';
import { RiegoService } from 'src/app/service/riego.service';
import { AsesoriaRiego } from 'src/app/Core/modelo/asesoria-riego';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';

@Component({
  selector: 'app-cuaderno-digi',
  templateUrl: './cuaderno-digi.component.html',
  styleUrls: ['./cuaderno-digi.component.css']
})
export class CuadernoDigiComponent implements OnInit{

  home : MenuItem = {}
  items : MenuItem[] = [];
  usuarios: Usuario[]=[];
  loading : boolean = true;
  nombreUsuario : string = '';
  idFinca:number;
  fincas: Finca[];
  finca: Finca | any;
  subTituloTabla: string ='';
  listadoPlantacion: Plantacion[];
  listadoLabor: LaborSuelo[];
  laborFiltrada:LaborSuelo[];
  listadoAplicacionAgro: AplicacionAgroquimico[];
  aplicacionAgroFiltrado:AplicacionAgroquimico[];
  listadoAsesoria: AsesoriaAgroquimico[];
  asesoriaFiltrados:AsesoriaAgroquimico[]; 
  listadoRiego: Riego[];
  riegoFiltrado:Riego[];
  listadoAsesoriaRiego: AsesoriaRiego[];
  asesoriaRiegoFiltrados:AsesoriaRiego[];

  //optengo fecha y hora actual del sistema
  fechaHoy: Date = new Date();
 
  

  constructor(
   
    private usuarioPorRol: UsuarioService,
    private fincaService: FincaService,
    private plantacionServi:PlantacionService,
    private laborService:LaborSueloService,
    private aplicacioonService:AplicacionAgroquimicoService,
    private asesoriaAgroService:AsesoriaAgroquimicoService,
    private riegoService: RiegoService,
    private asesoriaRiegoService:AsesoriaRiegoService,

    
    
  ) { }
  ngOnInit(): void {
    this.cargarItems();
    this.cargarUsuarioProductor();
    this.listarFincasPorNombreProductor();
  }
  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Reportes'},
      {label: 'Cuaderno digital', disabled:true}
    ];
  }

  
  cargarUsuarioProductor():void{
    this.usuarioPorRol.listarUsuarioPorRol("ROLE_PRODUCTOR").toPromise().then(
      data => {
        this.usuarios=data;
        this.loading=false;
      },
      err => {
        console.log(err);
      }

    );
  }

  
  listarFincasPorNombreProductor():void{
    const productor = document.querySelector('#nombreProductor') as HTMLSelectElement;
    productor.addEventListener('click', event =>{
      event.preventDefault();
      this.fincaService.listarFincaPorUsuario(this.nombreUsuario).subscribe(
        data =>{
          this.fincas=data;
          this.loading = false;
        },
        err =>{
          console.log(err);
        }
      )

    })
  }

 

 
  generarCuaderno(id: number): void{
   
      this.plantacionServi.listarPlantacionPorFinca(id).subscribe(
        data =>{
          this.listadoPlantacion = data;
          this.loading = false;
        
        },
        err =>{

          console.log(err);
        }
        
      )


      this,this.laborService.listarLaborSueloPorFinca(id).subscribe(
        data =>{
         
          this.listadoLabor = data;
          this.loading = false;
        
        },
        err =>{
          console.log(err);
        }
        
      )

      this.aplicacioonService.listarAplicacionAgroPorFinca(id).subscribe(
        data =>{
          this.listadoAplicacionAgro = data;
          this.loading = false;
        },
        err =>{
          console.log(err);
        }
        
      )

      this.asesoriaAgroService.listarAsesoriaPorFinca(id).subscribe(
        data =>{
          this.listadoAsesoria = data;
          this.loading=false;
        },
        err =>{
          console.log(err);
        }
        
      )

      this.riegoService.listarRiegoPorFinca(id).subscribe(
        data =>{
          this.listadoRiego = data;
          this.loading=false;
        },
        err =>{
          console.log(err);
        }
        
      )

      this.asesoriaRiegoService.listarAsesoriaPorFinca(id).subscribe(
        data =>{
          this.listadoAsesoriaRiego = data;
          this.loading=false;
        },
        err =>{
          console.log(err);
        }
        
      )
     
   
  } 

  getSeverityByEstado(asesoria : AsesoriaAgroquimico): string {
    const serverityByEstado : {[key: string]: string} = {
      true : 'success',
      false: 'danger'
    };
    return serverityByEstado[`${asesoria.asesoriaAplicada}`];
  }


  clear(table : Table) {
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

  obtenerapliAgroquimicosFiltrados(table: Table): void {
    this.aplicacionAgroFiltrado = table.filteredValue != null ? table.filteredValue : this.listadoAplicacionAgro;
  }

  obtenerFiltrosApliAgro(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }

  obtenerAsesoriaAgroFiltradas(table: Table): void {
    this.asesoriaFiltrados = table.filteredValue != null ? table.filteredValue : this.listadoAsesoria;
  }

  obtenerFiltrosAsesoriaAgro(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }


  obtenerRiegoFiltrados(table: Table): void {
    this.riegoFiltrado = table.filteredValue != null ? table.filteredValue : this.listadoRiego;
  }

  obtenerRiegoFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }

  obtenerAsesoriaFiltradas(table: Table): void {
    this.asesoriaRiegoFiltrados = table.filteredValue != null ? table.filteredValue : this.listadoAsesoriaRiego;
  }

  obtenerAsesoriaRiegoFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }
  
  


}
