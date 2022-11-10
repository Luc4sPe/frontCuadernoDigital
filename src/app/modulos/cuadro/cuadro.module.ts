import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//las libreria que utilizo para el html
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'src/app/menu/menu.module';
import { ValidateEqualModule } from 'ng-validate-equal';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TagModule } from 'primeng/tag';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {PickListModule} from 'primeng/picklist';
import {ListboxModule} from 'primeng/listbox';
import {MultiSelectModule} from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';

import { CuadroRoutingModule } from './cuadro-routing.module';
import { NuevoCuadroComponent } from './nuevo/nuevo-cuadro.component';
import { ModificarCuadroComponent } from './editarCuadro/modificar-cuadro.component';


@NgModule({
  declarations: [
    NuevoCuadroComponent,
    ModificarCuadroComponent
  ],
  imports: [
    CommonModule,
    CuadroRoutingModule,
    FormsModule,
    MenuModule,
    ValidateEqualModule,
    MessageModule,
    TableModule,
    RouterModule,
    ButtonModule,
    CardModule,
    ScrollTopModule,
    TagModule,
    BreadcrumbModule,
    PickListModule,
    ListboxModule,
    DropdownModule,
    MultiSelectModule,
    KeyFilterModule,
    

  ]
})
export class CuadroModule { }
