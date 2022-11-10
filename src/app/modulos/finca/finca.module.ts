import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {TabViewModule} from 'primeng/tabview';
import {PickListModule} from 'primeng/picklist';
import {ListboxModule} from 'primeng/listbox';
import {MultiSelectModule} from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FincaRoutingModule } from './finca-routing.module';
import { FincaNuevaComponent } from './nueva/finca-nueva.component';
import { ChipModule } from 'primeng/chip';
import { RippleModule } from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {CarouselModule} from 'primeng/carousel';
import { KeyFilterModule } from 'primeng/keyfilter';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import {InputNumberModule} from 'primeng/inputnumber';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {InputTextModule} from 'primeng/inputtext';
import { EditarFincaComponent } from './editarFinca/editar-finca.component';
import {StepsModule} from 'primeng/steps';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ListaFincaComponent } from './listado/lista-finca.component';



@NgModule({
  declarations: [
    FincaNuevaComponent,
    EditarFincaComponent,
    ListaFincaComponent,
    
    
  ],
  imports: [
    CommonModule,
    FincaRoutingModule,
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
    TabViewModule,
    PickListModule,
    ListboxModule,
    MultiSelectModule,
    DropdownModule,
    ChipModule,
    RippleModule,
    ToastModule,
    DynamicDialogModule,
    CarouselModule,
    KeyFilterModule,
    VirtualScrollerModule,
    ChartModule,
    TooltipModule,
    InputNumberModule,
    TriStateCheckboxModule,
    InputTextModule,
    StepsModule,
    RadioButtonModule,
    InputSwitchModule
  ]
})
export class FincaModule { }
