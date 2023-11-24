import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'src/app/menu/menu.module';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesDeActividadComponent } from './usuarios/reportes/reportes-de-actividad.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { UsuariosMasActivosComponent } from './usuarios/usuariosMasActivos/usuarios-mas-activos.component';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';

import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DropdownModule } from 'primeng/dropdown';

import { KeyFilterModule } from 'primeng/keyfilter';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { RippleModule } from 'primeng/ripple';
import { ActividadPorUsuariosComponent } from './usuarios/ActividadPorUsuarios/actividad-por-usuarios.component';
import { AgroquimicosMasUtilizadosComponent } from './agroquimicos/agroquimicosMasUtilizados/agroquimicos-mas-utilizados.component';
import { ReportesAgroquimicosComponent } from './agroquimicos/informes/reportes-agroquimicos.component';
import { InputTextModule } from 'primeng/inputtext';
import { AgroquiMasUsadosPorProductorComponent } from './agroquimicos/agroquiMasUsadosPorProductor/agroqui-mas-usados-por-productor.component';
import { AsesoriaRiegoAgroquimicoComponent } from './asesorias/asesoriaRiegoAgroquimico/asesoria-riego-agroquimico.component';
import { InformesComponent } from './asesorias/informesAsesorias/informes.component';
import { AsesoriaRiegoAgroPorProductorComponent } from './asesorias/asesoriaRiegoAgroPorProductor/asesoria-riego-agro-por-productor.component';
import { CuadernoDigiComponent } from './Cuaderno/cuaderno-digi.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    ReportesDeActividadComponent,
    UsuariosMasActivosComponent,
    ActividadPorUsuariosComponent,
    AgroquimicosMasUtilizadosComponent,
    ReportesAgroquimicosComponent,
    AgroquiMasUsadosPorProductorComponent,
    AsesoriaRiegoAgroquimicoComponent,
    InformesComponent,
    AsesoriaRiegoAgroPorProductorComponent,
    CuadernoDigiComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    MenuModule,
    BreadcrumbModule, 
    FormsModule,
    RouterModule,
    TableModule,
    MessageModule,
    CardModule,
    CalendarModule,
    ChartModule,
    InputNumberModule,
    ScrollTopModule,
    DropdownModule,
    KeyFilterModule,
    ChipModule,
    TagModule,
    RippleModule,
    InputTextModule,
    AutoCompleteModule,
    CheckboxModule
    

  ],
  schemas: []
})
export class ReportesModule { }
