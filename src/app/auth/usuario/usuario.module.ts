import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{FormsModule,ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { NuevoUsuarioComponent } from './nuevo/nuevo-usuario.component';




@NgModule({
  declarations: [
  
    NuevoUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
