import { Component, OnInit } from '@angular/core';
import { Plantacion } from 'src/app/Core/modelo/plantacion';
import { MenuItem } from 'primeng/api/menuitem';
import { PlantacionService } from 'src/app/service/plantacion.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-obtener-plantacion',
  templateUrl: './obtener-plantacion.component.html',
  styleUrls: ['./obtener-plantacion.component.css']
})
export class ObtenerPlantacionComponent implements OnInit {

  plantacion: Plantacion |any; 
  home : MenuItem = {}
  items : MenuItem[] = [];
  msj: string;

  constructor(
    private plantacionService: PlantacionService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerPlantacion(id);
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Plantación'},
      {label: 'Detalle', disabled:true}
    ];
  }

  obtenerPlantacion(id: number): void{
    this.plantacionService.datallePlantacion(id).toPromise().then(
      data =>{
        this.plantacion=data;
        Swal.fire({
          icon: 'success',
          title: this.msj,
          text: 'Plantación Obtenida',
        });

      },
      err =>{
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title:'Error al obtener la plantación',
          text: this.msj,
          
        });        
      }

    )
  }

  volver(){
    this.location.back();
  }



}
