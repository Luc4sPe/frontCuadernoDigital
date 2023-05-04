import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'src/app/menu/menu.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {ListboxModule} from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { ValidateEqualModule } from 'ng-validate-equal';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { AsesoriaRiegoRoutingModule } from './asesoria-riego-routing.module';
import { NuevaAsesoriaComponent } from './nueva-asesoria/nueva-asesoria.component';
import { ModificarAsesoriaComponent } from './modificar-asesoria/modificar-asesoria.component';
import { ListarAsesoriaComponent } from './listar-asesoria/listar-asesoria.component';



@NgModule({
  declarations: [
    NuevaAsesoriaComponent,
    ModificarAsesoriaComponent,
    ListarAsesoriaComponent
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
    MessageModule,
    ValidateEqualModule,
    TableModule,
    CardModule
  ]
})
export class AsesoriaRiegoModule { }
