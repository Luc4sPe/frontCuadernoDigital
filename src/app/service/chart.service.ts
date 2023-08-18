import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../Core/modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  paletaDeColores = ['#003f5c','#f95d6a','#00c8cd','#2f4b7c', '#665191','#a05195', '#d45087', '#ff7c43', '#ffa600','#1c9be8', '#00b4eb', '#00d696', '#85dc56', '#e8d71f'];

  constructor(private usuariosService : UsuarioService) { }

  public pieCharCantidadUsuariosActivosEInactivos(usuarios : Usuario[]):any{
    const data = {
      labels: ['Activos', 'Inactivos'],
      datasets: [
        {
          data: [
            usuarios.filter(u => u.estadoActivo === true).length,
            usuarios.filter(u => u.estadoActivo === false).length,
          ],
          backgroundColor: ['#14854c', '#d41740', '#14854c', '#d41740'],
          hoverBackgroundColor: ['#519259', '#DD4A48'],
        },
      ],
    };
    return data;
  }

  public formatearPieChart(labels: string[], datos:any) : any{
    const chart = {
      labels: labels,
      datasets: [
          {
              data: datos,
              backgroundColor: this.paletaDeColores
          }
      ]
    };
    return chart;
  }

  public formatearVerticalBarChart(labels: string[], datos: any, labelDataSet : string): any {
    const chart = {
      labels: labels,
      datasets: [
          {
              label: labelDataSet,
              backgroundColor: this.paletaDeColores[Math.floor(Math.random() * this.paletaDeColores.length)],
              data: datos
          },
      ]
    };
    return chart;
  }

  public formatearSteppedLineChart(labels:string[], datos:any, labelDataSet:string, pointRadius:number) : any{
    const chart = {
      labels: labels,
      datasets: [
        {
          label: labelDataSet,
          data: datos,
          borderColor: this.paletaDeColores[Math.floor(Math.random() * this.paletaDeColores.length)],
          fill: false,
          stepped: true,
          pointRadius: pointRadius
        }
      ]
    };
    return chart;
  }

  public formatearRadarChart(labels: string[], datos:any,labelDataSet : string) : any{
    const chart = {
      labels: labels,
      datasets: [
          {
            label:labelDataSet,
            data: datos,
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#ff1a40',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
          }
      ]
    };
    return chart;
  }

}
