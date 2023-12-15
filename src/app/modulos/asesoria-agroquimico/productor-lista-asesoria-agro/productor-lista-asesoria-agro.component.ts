import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { AsesoriaAgroquimicoDto } from 'src/app/Core/dto/asesoria-agroquimico-dto';
import { AsesoriaAgroquimico } from 'src/app/Core/modelo/asesoria-agroquimico';
import { Finca } from 'src/app/Core/modelo/finca';
import { AplicacionAgroquimicoService } from 'src/app/service/aplicacion-agroquimico.service';
import { AsesoriaAgroquimicoService } from 'src/app/service/asesoria-agroquimico.service';
import { FincaService } from 'src/app/service/finca.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-productor-lista-asesoria-agro',
  templateUrl: './productor-lista-asesoria-agro.component.html',
  styleUrls: ['./productor-lista-asesoria-agro.component.css']
})
export class ProductorListaAsesoriaAgroComponent implements OnInit {

  anuncio : string = ''; 
  home : MenuItem = {}
 items : MenuItem[] = [];
 usuario:any;
 asesiria: AsesoriaAgroquimicoDto = new AsesoriaAgroquimicoDto();
 msj:string;
 fincas: Finca[];
 loading : boolean = true;
 listadoAsesoria: AsesoriaAgroquimico[];
 asesoriaFiltrados:AsesoriaAgroquimico[]; 
 usuarioProductor:any;
 isProductor: boolean = false;

  constructor(
    private fincaService: FincaService,
    private tokenService: TokenService,
    private agriquimicoService: AplicacionAgroquimicoService,
    private asesoriaService:AsesoriaAgroquimicoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.usuarioProductor=this.tokenService.getUserName();
    this.isProductor=this.tokenService.isProductor();
    this.listarFincasPorNombre(this.usuarioProductor);
    
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Asesoría de agroquímico'},
      {label: 'Listado', disabled:true}
    ];
  }

  listarFincasPorNombre(nombreUsuairo: string): void{
    this.fincaService.listarFincaPorUsuario(nombreUsuairo).subscribe(
      data =>{
        this.fincas= data;
        this.listadoAsesoriaDeUnaFinca();
      },
      err =>{
        console.log(err);
      }
    )
    
  }

  listadoAsesoriaDeUnaFinca(): void{
    const valor = document.querySelector('#nomreFinca') as HTMLSelectElement;
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

  getSeverityByEstado(asesoria : AsesoriaAgroquimico): string {
    const serverityByEstado : {[key: string]: string} = {
      true : 'success',
      false: 'danger'
    };
    return serverityByEstado[`${asesoria.asesoriaAplicada}`];
  }

  aplico(id: number):void {
    /*se solicita al backend la utilización de la asesoria */
    this.asesoriaService.seAplico(id).subscribe(  
      (data) => {
        this.anuncio = data.mensaje;
        
        Swal.fire('Aplicada', this.anuncio, 'success');
      
        setInterval("location.reload()",3000);
      }, 
      (err) => {
        this.anuncio = err.error.mensaje;
        Swal.fire('Error al aplicar', this.anuncio, 'error')

      })
  }

  cancelarApli(id: number): void {

    /*solicito al backend la cancelación de la asesoria */
    this.asesoriaService.cancelarAplicacion(id).subscribe(
      (data) => {
        this.anuncio = data.mensaje;
        Swal.fire('Usuario Inactivo', this.anuncio, 'success');
        setInterval("location.reload()",3000);
      }, 
      (err) => {
        this.anuncio = err.error.mensaje;
        Swal.fire('Error al cancelar la apliocaón de la', this.anuncio, 'error')

      })

  }

 /*  botonActualizar(): void{
    setInterval("location.reload()",300);
  } */

  


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

  


}
