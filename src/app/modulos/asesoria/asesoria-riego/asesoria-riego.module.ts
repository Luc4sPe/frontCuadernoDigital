import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsesoriaRiegoRoutingModule } from './asesoria-riego-routing.module';
import { NuevaAsesoriaComponent } from './nueva-asesoria/nueva-asesoria.component';


@NgModule({
  declarations: [
    NuevaAsesoriaComponent
  ],
  imports: [
    CommonModule,
    AsesoriaRiegoRoutingModule
  ]
})
export class AsesoriaRiegoModule { }
