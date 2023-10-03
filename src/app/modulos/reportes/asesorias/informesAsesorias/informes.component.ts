import { Component,OnInit  } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit{

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
      {label: 'Asesorias'},
      {label: 'riego, agroquimico', disabled:true}
    ];
  }

}
