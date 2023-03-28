import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AgroquimicoService } from 'src/app/service/agroquimico.service';
import { Agroquimico } from 'src/app/Core/modelo/agroquimico';

@Component({
  selector: 'app-detalle-agroquimico',
  templateUrl: './detalle-agroquimico.component.html',
  styleUrls: ['./detalle-agroquimico.component.css']
})
export class DetalleAgroquimicoComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  msj:string;
  agroquimico: Agroquimico | any;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private agroquimicoService:AgroquimicoService
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerAgroquimico(id);
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Agroquímico'},
      {label: 'Detalle', disabled:true}
    ];
  }

  obtenerAgroquimico(id: number): void{
    this.agroquimicoService.datalle(id).toPromise().then(
      data =>{
        this.agroquimico=data;
        Swal.fire({
          icon: 'success',
          title: this.msj,
          text: 'Agroquímico obtenido',
        });
      },
      err =>{
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title:'Error al obtener el cultivo',
          text: this.msj,
          
        });        
      }


    )
  }


  volver(){
    this.location.back();
  }


  

}
