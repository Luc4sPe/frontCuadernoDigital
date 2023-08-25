import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
@Component({
  selector: 'app-reportes-agroquimicos',
  templateUrl: './reportes-agroquimicos.component.html',
  styleUrls: ['./reportes-agroquimicos.component.css']
})
export class ReportesAgroquimicosComponent implements OnInit {

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
      {label: 'Agroquímicos'},
      {label: 'Más utilizados', disabled:true}
    ];
  }

}
