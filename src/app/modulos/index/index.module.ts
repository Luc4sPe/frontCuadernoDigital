import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index/index.component';
import { MenuModule } from 'src/app/menu/menu.module';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MenuModule,
    CardModule,
    ChipModule,
    RouterModule
  ]
})
export class IndexModule { }
