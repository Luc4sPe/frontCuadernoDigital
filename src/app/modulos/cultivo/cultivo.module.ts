import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CultivoRoutingModule } from './cultivo-routing.module';
import { NuevoComponent } from './finca/nuevo.component';
import { NuevaComponent } from './finca/crearNuevaFinca/nueva.component';
import { NuevoProductorComponent } from './finca/productor/nuevo-productor.component';


@NgModule({
  declarations: [
    NuevoComponent,
    NuevaComponent,
    NuevoProductorComponent
  ],
  imports: [
    CommonModule,
    CultivoRoutingModule
  ]
})
export class CultivoModule { }
