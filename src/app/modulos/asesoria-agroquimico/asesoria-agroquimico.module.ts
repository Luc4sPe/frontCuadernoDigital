import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'src/app/menu/menu.module';
import { AsesoriaAgroquimicoRoutingModule } from './asesoria-agroquimico-routing.module';
import { NuevaAsesoriaAgroComponent } from './nueva-asesoria-agro/nueva-asesoria-agro.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ValidateEqualModule } from 'ng-validate-equal';
import {MultiSelectModule} from 'primeng/multiselect';
import {RadioButtonModule} from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import {ListboxModule} from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ListadoAsesoriaComponent } from './listado-asesoria/listado-asesoria.component';
import { EditarAsesoriaAgroComponent } from './editar-asesoria-agro/editar-asesoria-agro.component';
import { ProductorListaAsesoriaAgroComponent } from './productor-lista-asesoria-agro/productor-lista-asesoria-agro.component';
import { TagModule } from 'primeng/tag';






@NgModule({
  declarations: [
    NuevaAsesoriaAgroComponent,
    ListadoAsesoriaComponent,
    EditarAsesoriaAgroComponent,
    ProductorListaAsesoriaAgroComponent,
 

   
  ],
  imports: [
    CommonModule,
    AsesoriaAgroquimicoRoutingModule,
    MenuModule,
    BreadcrumbModule,
    FormsModule,
    ButtonModule,
    ValidateEqualModule,
    MultiSelectModule,
    RadioButtonModule,
    MessageModule,
    CalendarModule,
    TableModule,
    CardModule,
    ListboxModule,
    TagModule
  ]
})
export class AsesoriaAgroquimicoModule { }
