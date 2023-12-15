import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { AsesoriaRiego } from 'src/app/Core/modelo/asesoria-riego';
import { Finca } from 'src/app/Core/modelo/finca';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';
import { FincaService } from 'src/app/service/finca.service';
import { RiegoService } from 'src/app/service/riego.service';
import { TokenService } from 'src/app/service/token.service';
import { Table } from 'primeng/table';
import { AsesoriaRiegoDto } from 'src/app/Core/dto/asesoria-riego-dto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productor-lista-asesoria-riego',
  templateUrl: './productor-lista-asesoria-riego.component.html',
  styleUrls: ['./productor-lista-asesoria-riego.component.css']
})
export class ProductorListaAsesoriaRiegoComponent implements OnInit {

  anuncio : string = ''; 
   home : MenuItem = {}
  items : MenuItem[] = [];
  usuario:any;
  asesiria: AsesoriaRiegoDto = new AsesoriaRiegoDto();
  msj:string;
  fincas: Finca[];
  loading : boolean = true;
  listadoAsesoria: AsesoriaRiego[];
  asesoriaFiltrados:AsesoriaRiego[]; 
  usuarioProductor:any;
  isProductor: boolean = false;
  
  constructor(
     private fincaService: FincaService,
    private tokenService: TokenService,
    private riegoService: RiegoService,
    //private location : Location,
    private asesoriaService:AsesoriaRiegoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    this.usuarioProductor=this.tokenService.getUserName();
    this.listarFincasPorNombre(this.usuarioProductor);
    this.isProductor=this.tokenService.isProductor();
   
   
  }

   cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Asesoría de riego'},
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


  getSeverityByEstado(asesoria : AsesoriaRiego): string {
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

  /* botonActualizar(): void{
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
