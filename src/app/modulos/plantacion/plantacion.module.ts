import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'src/app/menu/menu.module';
import { PlantacionRoutingModule } from './plantacion-routing.module';
import { PlantacionNuevaComponent } from './nueva/plantacion-nueva.component';




@NgModule({
  declarations: [
    PlantacionNuevaComponent
  ],
  imports: [
    CommonModule,
    PlantacionRoutingModule,
    MenuModule,
    
  ]
})
export class PlantacionModule { }
