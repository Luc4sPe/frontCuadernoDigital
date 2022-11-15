import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CulGuardService as guarEncargadoAgri } from 'src/app/Core/guards/cul-guard.service';
import { Roles } from 'src/app/Core/enmus/roles';
import { NuevoAgroquimicoComponent } from './nuevo/nuevo-agroquimico.component';

const Encargado_Agricola = Roles.ENCARGADO_AGRICOLA;
const ADMIN=Roles.ADMIN;
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'nuevoAgroquimico',
      component: NuevoAgroquimicoComponent,
      canActivate:[guarEncargadoAgri],
      data:{rolesEsperados: [ADMIN,Encargado_Agricola]} },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgroquimicoRoutingModule { }
