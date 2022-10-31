import { Component, OnInit } from '@angular/core';
import { Cultivo } from 'src/app/Core/modelo/cultivo';
import { MenuItem } from 'primeng/api/menuitem';
import { CultivoService } from 'src/app/service/cultivo.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-obtener-cultivo',
  templateUrl: './obtener-cultivo.component.html',
  styleUrls: ['./obtener-cultivo.component.css']
})
export class ObtenerCultivoComponent implements OnInit {

  cultivo:Cultivo | any;
  home : MenuItem = {}
  items : MenuItem[] = [];
  msj:string;
  constructor(
    private cultivoService: CultivoService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenercultivo(id);
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Cultivo'},
      {label: 'Detalle', disabled:true}
    ];
  }

  obtenercultivo(id: number): void{
    this.cultivoService.datalle(id).toPromise().then(
      data =>{
        this.cultivo=data;
        Swal.fire({
          icon: 'success',
          title: this.msj,
          text: 'Cultivo Obtenido',
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
