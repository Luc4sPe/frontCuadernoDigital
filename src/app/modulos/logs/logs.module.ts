import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { ListaComponent } from './listado/lista.component';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule
  ]
})
export class LogsModule { }
