import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-listado-plantacion',
  templateUrl: './listado-plantacion.component.html',
  styleUrls: ['./listado-plantacion.component.css']
})
export class ListadoPlantacionComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Plantacion', routerLink:'/index'},
      {label: 'Listado Plantación', disabled:true}
    ];
  }

}
