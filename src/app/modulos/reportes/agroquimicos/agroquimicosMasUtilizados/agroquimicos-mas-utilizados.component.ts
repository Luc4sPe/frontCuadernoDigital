
import { Component, OnInit } from '@angular/core';
import { Agroquimico } from 'src/app/Core/modelo/agroquimico';
import { AplicacionAgroquimico } from 'src/app/Core/modelo/aplicacion-agroquimico';
import { AgroquimicoService } from 'src/app/service/agroquimico.service';
import { AplicacionAgroquimicoService } from 'src/app/service/aplicacion-agroquimico.service';
import { FechaDesdeHastaService } from 'src/app/service/fecha-desde-hasta-service';
@Component({
  selector: 'app-agroquimicos-mas-utilizados',
  templateUrl: './agroquimicos-mas-utilizados.component.html',
  styleUrls: ['./agroquimicos-mas-utilizados.component.css']
})
export class AgroquimicosMasUtilizadosComponent implements OnInit {

  rangoFechas : Date[]  = [new Date(), new Date()];
  cantidadAgroquimico : number = 0;
  cantidadMax : number = 5;
  data : any
  options : any
  apliAgroquimico : AplicacionAgroquimico [] = []; 
  paletaDeColores = ['#003f5c','#2f4b7c', '#665191','#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600','#1c9be8', '#00b4eb', '#00c8cd', '#00d696', '#85dc56', '#e8d71f']
  cardSubtitulo : string = '';

  constructor(
    private FechaDesdeHastaService : FechaDesdeHastaService,
    private agroquiService : AgroquimicoService, 
    private aplicacionAgroService: AplicacionAgroquimicoService
    
  ) { }

  ngOnInit(): void {
    this.rangoFechas = this.FechaDesdeHastaService.getFechaDesdeHasta(this.rangoFechas[0], this.rangoFechas[1]);
    this.obtenerApliAgroquimicos();
  }

  obtenerApliAgroquimicos(): void {
    this.aplicacionAgroService.listarAplicacionAgroquimico().toPromise().then(
      data => {
        this.apliAgroquimico = data;
        this.cargarGrafico(this.cantidadMax)
      }
    )
  }

  cargarGrafico(cantidadMaxima : number): void {
    this.cardSubtitulo = "Desde todos los tiempos";
    let agroquimicosMasUtilizados : {[key: string]: number} = {};
    //obtengo los nombres de los agroquímicos.
    const agroquimico = this.apliAgroquimico.map(agro => agro.agroquimico.nombreComercial).filter(principioActivo => principioActivo);
    //en el objeto cargo, 'agroquimico': las veces que aparece 
    agroquimico.forEach( principioActivo => {
      agroquimicosMasUtilizados[principioActivo] = !agroquimicosMasUtilizados[principioActivo] ? 1 : agroquimicosMasUtilizados[principioActivo] + 1;
    })
    //transforma el objeto en un array de objetos ordenado Desc [{agro, times}]
    let masActivos = Object.keys(agroquimicosMasUtilizados)
                        .map(principioActivo => ({agro: principioActivo, times: agroquimicosMasUtilizados[principioActivo]}))
                        .sort((a, b) => b.times - a.times)
                        .slice(0, cantidadMaxima);

    //obtengo labels y datos del grafico
    const labels = masActivos.map(agro => agro.agro );
    const cantidad = masActivos.map(agro => agro.times);
    //grafico
    this.data = {
      labels : labels,
      datasets : [
        {
          label : 'Agroquímicos más utilizados',
          backgroundColor : this.paletaDeColores[11],
          data : cantidad
        }
      ]
    }
    this.options = {
      indexAxis: 'x',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
    }    
  }

  cargarGraficoConFiltro(): void {

    this.rangoFechas = this.FechaDesdeHastaService.getFechaDesdeHasta(this.rangoFechas[0], this.rangoFechas[1]);
    const fechaDesde = this.rangoFechas[0];
    const fechaHasta = this.rangoFechas[1];
    this.cardSubtitulo = `Desde ${fechaDesde.toLocaleDateString()} hasta ${fechaHasta.toLocaleDateString()}. `;
    let agroquimicosMasUtilizados : {[key: string]: number} = {};

    //obtengo los nombres de los agroquímicos
    const nombresDeAgrquimico = this.apliAgroquimico
                                  .filter(agroquimico => new Date(agroquimico.fechaDeAplicacion)>= fechaDesde && new Date(agroquimico.fechaDeAplicacion) <= fechaHasta)
                                  .map(agro => agro.agroquimico.nombreComercial).
                                  filter(principioActivo => principioActivo);      

                              

    //en el objeto cargo, 'agroquímico': las veces que aparece
    nombresDeAgrquimico.forEach( principioActivo => {
      agroquimicosMasUtilizados[principioActivo] = !agroquimicosMasUtilizados[principioActivo] ? 1 : agroquimicosMasUtilizados[principioActivo] + 1;
    })

    //transforma el objeto en un array de objetos ordenado Desc [{usuario, times}]
   
     let masActivos = Object.keys(agroquimicosMasUtilizados)
                        .map(principioActivo => ({agro: principioActivo, times: agroquimicosMasUtilizados[principioActivo]}))
                        .sort((a, b) => b.times - a.times)
                        .slice(0, this.cantidadMax);

    //obtengo labes y datos
    const labels = masActivos.map(agro => agro.agro );
    const cantidad = masActivos.map(agro => agro.times);


    //grafico
    masActivos.length === 0 ? this.cardSubtitulo += 'Sin actividad' : null;
    this.data = {
      labels : labels,
      datasets : [
        {
          label : 'Agroquímicos más utilizados',
          backgroundColor : this.paletaDeColores[11],
          data : cantidad
        }
      ]
    }
    this.options = {
      indexAxis: 'y'
    }    
  }


}

