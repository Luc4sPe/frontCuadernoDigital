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
import { RiegoRoutingModule } from './riego-routing.module';
import { RiegoNuevoComponent } from './nuevo/riego-nuevo.component';
import { EditarRiegoComponent } from './editar/editar-riego.component';
import { ListarRiegoComponent } from './listar/listar-riego.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarRiegosComponent } from './listarRiegoXUsuarios/listar-riegos.component';
import { MenuModule } from 'src/app/menu/menu.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import { NuevoRAComponent } from './riegoAsesoria/nuevo-ra.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    RiegoNuevoComponent,
    EditarRiegoComponent,
    ListarRiegoComponent,
    ListarRiegosComponent,
    NuevoRAComponent
  ],
  imports: [
    CommonModule,
    RiegoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
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
    RadioButtonModule,
    InputSwitchModule,
    TagModule

    
  ]
})
export class RiegoModule { }
