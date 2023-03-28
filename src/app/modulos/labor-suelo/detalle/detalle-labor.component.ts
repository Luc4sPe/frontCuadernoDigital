import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LaborSueloService } from 'src/app/service/labor-suelo.service';
import { LaborSuelo } from 'src/app/Core/modelo/labor-suelo';
@Component({
  selector: 'app-detalle-labor',
  templateUrl: './detalle-labor.component.html',
  styleUrls: ['./detalle-labor.component.css']
})
export class DetalleLaborComponent implements OnInit {


  home : MenuItem = {}
  items : MenuItem[] = [];
  msj:string;
  laborSuelo: LaborSuelo |any;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private laborService:LaborSueloService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerLaborSuelo(id);
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Labor de suelo'},
      {label: 'Detalle', disabled:true}
    ];
  }

  obtenerLaborSuelo(id: number): void{
    this.laborService.datalleLaborSuelo(id).toPromise().then(
      data =>{
        this.laborSuelo=data;
        Swal.fire({
          icon: 'success',
          title: this.msj,
          text: 'Labor de suelo obtenida',
        });
      },
      err =>{
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title:'Error al obtener la labor de suelo',
          text: this.msj,
          
        });        
      }


    )
  }


  volver(){
    this.location.back();
  }



}
