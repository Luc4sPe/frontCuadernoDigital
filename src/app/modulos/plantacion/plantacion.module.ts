import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantacionRoutingModule } from './plantacion-routing.module';
import { PlantacionNuevaComponent } from './nueva/plantacion-nueva.component';


@NgModule({
  declarations: [
    PlantacionNuevaComponent
  ],
  imports: [
    CommonModule,
    PlantacionRoutingModule
  ]
})
export class PlantacionModule { }
