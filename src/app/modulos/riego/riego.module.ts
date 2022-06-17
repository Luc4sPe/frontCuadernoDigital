import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiegoRoutingModule } from './riego-routing.module';
import { RiegoNuevoComponent } from './nuevo/riego-nuevo.component';
import { EditarRiegoComponent } from './editar/editar-riego.component';
import { ListarRiegoComponent } from './listar/listar-riego.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarRiegosComponent } from './listarRiegoXUsuarios/listar-riegos.component';
import { MenuModule } from 'src/app/menu/menu.module';


@NgModule({
  declarations: [
    RiegoNuevoComponent,
    EditarRiegoComponent,
    ListarRiegoComponent,
    ListarRiegosComponent
  ],
  imports: [
    CommonModule,
    RiegoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule
    
  ]
})
export class RiegoModule { }
