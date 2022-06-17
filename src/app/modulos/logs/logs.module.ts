import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { ListaComponent } from './listado/lista.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import {ScrollTopModule} from 'primeng/scrolltop';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'src/app/menu/menu.module';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    BreadcrumbModule,
    ButtonModule,
    TableModule,
    RouterModule,
    DropdownModule,
    ScrollTopModule,
    CardModule,
    MenuModule,
    FormsModule
  ]
})
export class LogsModule { }
