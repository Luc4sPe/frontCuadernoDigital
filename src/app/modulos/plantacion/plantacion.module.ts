import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'src/app/menu/menu.module';
import { PlantacionRoutingModule } from './plantacion-routing.module';
import { PlantacionNuevaComponent } from './nueva/plantacion-nueva.component';
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
import { ListadoPlantacionComponent } from './listado/listado-plantacion.component';




@NgModule({
  declarations: [
    PlantacionNuevaComponent,
    ListadoPlantacionComponent
  ],
  imports: [
    CommonModule,
    PlantacionRoutingModule,
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
    CardModule
    
  ]
})
export class PlantacionModule { }
