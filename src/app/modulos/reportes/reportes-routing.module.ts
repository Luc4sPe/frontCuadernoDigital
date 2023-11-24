import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { CulGuardService as guarUsuarios } from 'src/app/Core/guards/cul-guard.service';
import { ReportesDeActividadComponent } from './usuarios/reportes/reportes-de-actividad.component';
import { ReportesAgroquimicosComponent } from './agroquimicos/informes/reportes-agroquimicos.component';
import { InformesComponent } from './asesorias/informesAsesorias/informes.component';
import { AsesoriaRiegoAgroquimicoComponent } from './asesorias/asesoriaRiegoAgroquimico/asesoria-riego-agroquimico.component';
import { CuadernoDigiComponent } from './Cuaderno/cuaderno-digi.component';


const ADMIN = Roles.ADMIN;
const Productor = Roles.PRODUCTOR;
const Encargado_Agricola = Roles.ENCARGADO_AGRICOLA;

const routes: Routes = [

  {
    path: '',
    children: [
     /*  { path: '', redirectTo: 'usuarios/actividad' }, */
      {
        path: 'usuarios/actividad',
        component: ReportesDeActividadComponent,
        canActivate: [guarUsuarios],
        data: { rolesEsperados: [ADMIN] },
      },
    ]
  },

  {
    path: '',
    children: [
     /*  { path: '', redirectTo: 'usuarios/actividad' }, */
      {
        path: 'agroquimico/masUtilizados',
        component: ReportesAgroquimicosComponent,
        canActivate: [guarUsuarios],
        data: { rolesEsperados: [ADMIN,Encargado_Agricola] },
      },
    ]
  },
  {
    path: '',
    children: [
     /*  { path: '', redirectTo: 'usuarios/actividad' }, */
      {
        path: 'informe/asesorias',
        component: InformesComponent,
        canActivate: [guarUsuarios],
        data: { rolesEsperados: [ADMIN,Encargado_Agricola] },
      },
    ]
  },
  {
    path: '',
    children: [
     /*  { path: '', redirectTo: 'usuarios/actividad' }, */
      {
        path: 'cuadernoDigital',
        component: CuadernoDigiComponent,
        canActivate: [guarUsuarios],
        data: { rolesEsperados: [ADMIN,Encargado_Agricola] },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
