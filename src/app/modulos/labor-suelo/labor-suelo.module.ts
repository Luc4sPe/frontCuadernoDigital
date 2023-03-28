import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'src/app/menu/menu.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule } from '@angular/forms';
import { ValidateEqualModule } from 'ng-validate-equal';
import { MessageModule } from 'primeng/message';
import {ListboxModule} from 'primeng/listbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import {MultiSelectModule} from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LaborSueloRoutingModule } from './labor-suelo-routing.module';
import { LaborNuevaComponent } from './nueva/labor-nueva.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ListaLaborSueloComponent } from './listado/lista-labor-suelo.component';
import { ActualizarLaborComponent } from './modificar/actualizar-labor.component';
import { DetalleLaborComponent } from './detalle/detalle-labor.component';


@NgModule({
  declarations: [
  
    LaborNuevaComponent,
       ListaLaborSueloComponent,
       ActualizarLaborComponent,
       DetalleLaborComponent
  ],
  imports: [
    CommonModule,
    LaborSueloRoutingModule,
    MenuModule,
    BreadcrumbModule,
    FormsModule,
    ValidateEqualModule,
    MessageModule,
    ListboxModule,
    KeyFilterModule,
    MultiSelectModule,
    TableModule,
    ScrollTopModule,
    ButtonModule,
    CardModule,
    InputSwitchModule,
    RadioButtonModule
  ]
})
export class LaborSueloModule { }
