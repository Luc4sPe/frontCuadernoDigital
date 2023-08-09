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



@NgModule({
  declarations: [
    NuevaAsesoriaAgroComponent,
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
    CalendarModule
  ]
})
export class AsesoriaAgroquimicoModule { }
