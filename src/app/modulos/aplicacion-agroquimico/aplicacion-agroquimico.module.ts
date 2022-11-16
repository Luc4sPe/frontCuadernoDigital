import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ValidateEqualModule } from 'ng-validate-equal';
import { MessageModule } from 'primeng/message';
import {ListboxModule} from 'primeng/listbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import {MultiSelectModule} from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'src/app/menu/menu.module';
import {RadioButtonModule} from 'primeng/radiobutton';

import { AplicacionAgroquimicoRoutingModule } from './aplicacion-agroquimico-routing.module';
import { NuevaAplicacionAgroComponent } from './nueva/nueva-aplicacion-agro.component';
import { ListadoAplicacionAgroComponent } from './listado/listado-aplicacion-agro.component';
import { ModificarAplicacionComponent } from './modificar/modificar-aplicacion.component';


@NgModule({
  declarations: [
    NuevaAplicacionAgroComponent,
    ListadoAplicacionAgroComponent,
    ModificarAplicacionComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    ValidateEqualModule,
    MessageModule,
    ListboxModule,
    KeyFilterModule,
    MultiSelectModule,
    TableModule,
    ScrollTopModule,
    ButtonModule,
    CardModule,
    FormsModule,
    MenuModule,
    RadioButtonModule,
    AplicacionAgroquimicoRoutingModule
  ]
})
export class AplicacionAgroquimicoModule { }
