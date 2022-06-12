import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{FormsModule,ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { NuevoUsuarioComponent } from './nuevo/nuevo-usuario.component';
import { ListaComponent } from './listar/lista.component';
import { ObtnerComponent } from './detalle/obtner.component';
import { ActualizarComponent } from './editar/actualizar.component';
import { EnviarEmailComponent } from './restablecerPassword/enviar-email/enviar-email.component';
import { CambioPasswordComponent } from './restablecerPassword/cambio-password/cambio-password.component';
import { MenuModule } from 'src/app/menu/menu.module';



@NgModule({
  declarations: [
  
    NuevoUsuarioComponent,
   
    ObtnerComponent,
    ActualizarComponent,
    EnviarEmailComponent,
    CambioPasswordComponent,
    ListaComponent
    
  ],
   
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule
   
  ]
})
export class UsuarioModule { }
