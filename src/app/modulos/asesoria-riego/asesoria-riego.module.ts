import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'src/app/menu/menu.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {ListboxModule} from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { AsesoriaRiegoRoutingModule } from './asesoria-riego-routing.module';
import { NuevaAsesoriaComponent } from './nueva-asesoria/nueva-asesoria.component';



@NgModule({
  declarations: [
    NuevaAsesoriaComponent
  ],
  imports: [
    CommonModule,
    AsesoriaRiegoRoutingModule,
    MenuModule,
    BreadcrumbModule,
    FormsModule,
    ButtonModule,
    MultiSelectModule,
    ListboxModule,
    MessageModule
  ]
})
export class AsesoriaRiegoModule { }
