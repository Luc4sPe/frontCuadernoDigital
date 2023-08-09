import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsesoriaAgroquimicoRoutingModule } from './asesoria-agroquimico-routing.module';
import { NuevaAsesoriaAgroComponent } from './nuevaAsesoria/nueva-asesoria-agro/nueva-asesoria-agro.component';


@NgModule({
  declarations: [
    NuevaAsesoriaAgroComponent
  ],
  imports: [
    CommonModule,
    AsesoriaAgroquimicoRoutingModule
  ]
})
export class AsesoriaAgroquimicoModule { }
