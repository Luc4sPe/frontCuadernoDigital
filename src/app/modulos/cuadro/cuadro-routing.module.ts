import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { CulGuardService as guarEncargadoAgricola } from 'src/app/Core/guards/cul-guard.service';
import { NuevoCuadroComponent } from './nuevo/nuevo-cuadro.component';

const Encargado_Agricola = Roles.ENCARGADO_AGRICOLA;
const routes: Routes = [
{
  path: '',
  children: [

   
    { path: 'crearcuadro',
    component: NuevoCuadroComponent,
    canActivate:[guarEncargadoAgricola],
    data:{rolesEsperados: [Encargado_Agricola]} 
    },
  ]
  
  }
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuadroRoutingModule { }
