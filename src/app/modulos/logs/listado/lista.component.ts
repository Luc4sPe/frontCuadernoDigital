import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/Core/modelo/log';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { LogAccionService } from 'src/app/service/log-accion.service';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  loading = true;
  logs : Log[] = [];
  acciones: any = [];
  home : MenuItem = {}
  items : MenuItem[] = [];

  constructor(
    private logsService: LogService, 
    private router: Router,
    private logAccionService : LogAccionService
  ) { }

  ngOnInit(): void {
    this.cargarLogs();
    this.cargarAcciones();
    this.cargarItems();   
  }

  clear(table : Table){
    table.clear();
  }

  cargarItems():void{
    this.items = [
      {label:'Logs de usuarios'},
      {label:'Listado', disabled:true}
    ];
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
  }

  cargarLogs(): void{
    this.logsService.listadoLogs().subscribe(
      data =>{
        this.logs = data;
        this.loading = false;

        this.logs.forEach(log =>{log.fecha = new Date(log.fecha)})
      }
    )
  }

  cargarAcciones():void{
    this.acciones = this.logAccionService.getAccionLog();   
  }

  detalleUsuario(idUsuario: number): void {
    this.router.navigate([`usuario/obtner/${idUsuario}`]);
    
    
  }

}
