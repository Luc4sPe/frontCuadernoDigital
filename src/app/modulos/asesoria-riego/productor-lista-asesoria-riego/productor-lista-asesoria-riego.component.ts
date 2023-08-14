import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { AsesoriaRiego } from 'src/app/Core/modelo/asesoria-riego';
import { Finca } from 'src/app/Core/modelo/finca';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';
import { FincaService } from 'src/app/service/finca.service';
import { RiegoService } from 'src/app/service/riego.service';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-productor-lista-asesoria-riego',
  templateUrl: './productor-lista-asesoria-riego.component.html',
  styleUrls: ['./productor-lista-asesoria-riego.component.css']
})
export class ProductorListaAsesoriaRiegoComponent implements OnInit {

   home : MenuItem = {}
  items : MenuItem[] = [];
  usuario:any;
  asesiria: AsesoriaRiego;
  msj:string;
  fincas: Finca[];
  loading : boolean = true;
  listadoAsesoria: AsesoriaRiego[];
  asesoriaFiltrados:AsesoriaRiego[]; 
  
  constructor(
     private fincaService: FincaService,
    private tokenService: TokenService,
    private riegoService: RiegoService,
    //private location : Location,
    private asesoriaService:AsesoriaRiegoService
  ) { }

  ngOnInit(): void {
   
  }

   cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Asesoría de riego'},
      {label: 'Listado', disabled:true}
    ];
  }
 
}
