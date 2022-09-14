import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { NuevoProductorComponent } from './productor/nuevo-productor.component';
import { CulGuardService as guarProductor } from 'src/app/Core/guards/cul-guard.service';

const Encargado_Agricola = Roles.ENCARGADO_AGRICOLA;
const routes: Routes = [
  {
    path: '',
    children: [
    
      { path: 'nuevo',
       component: NuevoProductorComponent,
       canActivate:[guarProductor],
       data:{rolesEsperados: [Encargado_Agricola]} },
      

      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CultivoRoutingModule { }