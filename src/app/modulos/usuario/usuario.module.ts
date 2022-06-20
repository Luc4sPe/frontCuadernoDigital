import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { NuevoUsuarioComponent } from './nuevo/nuevo-usuario.component';
import { ListaComponent } from './listar/lista.component';
import { ObtnerComponent } from './detalle/obtner.component';
import { ActualizarComponent } from './editar/actualizar.component';
import { EnviarEmailComponent } from './restablecerPassword/enviar-email/enviar-email.component';
import { CambioPasswordComponent } from './restablecerPassword/cambio-password/cambio-password.component';
import { MenuModule } from 'src/app/menu/menu.module';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ValidateEqualModule } from 'ng-validate-equal';
import {TabViewModule} from 'primeng/tabview';
import { ScrollTopModule } from 'primeng/scrolltop';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';


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
    MenuModule,
    RouterModule,
    TableModule,
    BreadcrumbModule,
    MessageModule,
    ButtonModule,
    KeyFilterModule,
    ValidateEqualModule,
    TabViewModule,
    ScrollTopModule,
    CardModule,
    TagModule
   
  ]
})
export class UsuarioModule { }
