import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{FormsModule,ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { NuevoUsuarioComponent } from './nuevo/nuevo-usuario.component';
import { ListaComponent } from './listar/lista.component';
import { ObtnerComponent } from './detalle/obtner.component';
import { ActualizarComponent } from './editar/actualizar.component';




@NgModule({
  declarations: [
  
    NuevoUsuarioComponent,
    ListaComponent,
    ObtnerComponent,
    ActualizarComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }