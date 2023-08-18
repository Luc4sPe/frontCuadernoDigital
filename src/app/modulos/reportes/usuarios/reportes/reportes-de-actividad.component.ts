import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
@Component({
  selector: 'app-reportes-de-actividad',
  templateUrl: './reportes-de-actividad.component.html',
  styleUrls: ['./reportes-de-actividad.component.css']
})
export class ReportesDeActividadComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Reportes'},
      {label: 'Usuarios'},
      {label: 'Actividad', disabled:true}
    ];
  }

}
