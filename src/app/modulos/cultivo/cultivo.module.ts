import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CultivoRoutingModule } from './cultivo-routing.module';
import { NuevoProductorComponent } from './productor/nuevo/nuevo-productor.component';
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
import { ListadoProductorComponent } from './productor/listar/listado-productor.component';
import { NuevoCultivoComponent } from './cultivo/nuevo/nuevo-cultivo.component';
import { DropdownModule } from 'primeng/dropdown';
import { ListaCultivoComponent } from './cultivo/listado/lista-cultivo.component';
import { ObtenerCultivoComponent } from './cultivo/detalle/obtener-cultivo.component';
import { ModificarCultivoComponent } from './cultivo/modificar/modificar-cultivo.component';


@NgModule({
  declarations: [
  NuevoProductorComponent,
  ListadoProductorComponent,
  NuevoCultivoComponent,
  ListaCultivoComponent,
  ObtenerCultivoComponent,
  ModificarCultivoComponent,
  

  
  ],
  imports: [
    CommonModule,
    CultivoRoutingModule,
    MenuModule,
    
    ValidateEqualModule,
    MessageModule,
    FormsModule,
    TableModule,
    RouterModule,
    ButtonModule,
    CardModule,
    ScrollTopModule,
    TableModule,
    TagModule,
    BreadcrumbModule,
    TabViewModule,
    DropdownModule

    


  
  ]
})
export class CultivoModule { }
