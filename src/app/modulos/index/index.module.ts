import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index/index.component';
import { MenuModule } from 'src/app/menu/menu.module';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MenuModule,
    CardModule,
    ChipModule
  ]
})
export class IndexModule { }
