import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiegoRoutingModule } from './riego-routing.module';
import { RiegoNuevoComponent } from './nuevo/riego-nuevo.component';
import { EditarRiegoComponent } from './editar/editar-riego.component';
import { ListarRiegoComponent } from './listar/listar-riego.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RiegoNuevoComponent,
    EditarRiegoComponent,
    ListarRiegoComponent
  ],
  imports: [
    CommonModule,
    RiegoRoutingModule,
    FormsModule
    
  ]
})
export class RiegoModule { }
