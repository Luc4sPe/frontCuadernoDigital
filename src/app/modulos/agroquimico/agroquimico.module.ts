import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'src/app/menu/menu.module';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule } from '@angular/forms';
import { ValidateEqualModule } from 'ng-validate-equal';
import { AgroquimicoRoutingModule } from './agroquimico-routing.module';
import { NuevoAgroquimicoComponent } from './nuevo/nuevo-agroquimico.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    NuevoAgroquimicoComponent
  ],
  imports: [
    CommonModule,
    AgroquimicoRoutingModule,
    MenuModule,
    CardModule,
    DropdownModule,
    BreadcrumbModule,
    MenuModule,
    MessageModule,
    FormsModule,
    ValidateEqualModule,
    ButtonModule
  ]
})
export class AgroquimicoModule { }
