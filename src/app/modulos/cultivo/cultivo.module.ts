import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CultivoRoutingModule } from './cultivo-routing.module';
import { NuevoComponent } from './finca/nuevo.component';
import { NuevaComponent } from './finca/crearNuevaFinca/nueva.component';


@NgModule({
  declarations: [
    NuevoComponent,
    NuevaComponent
  ],
  imports: [
    CommonModule,
    CultivoRoutingModule
  ]
})
export class CultivoModule { }
