import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { CulGuardService as guarProductor } from 'src/app/Core/guards/cul-guard.service';
import { LaborNuevaComponent } from './nueva/labor-nueva.component';

const Productor = Roles.PRODUCTOR;
const routes: Routes = [

  {
    path: '',
    children: [

      { path: 'crearLabor',
      component:LaborNuevaComponent,
      canActivate:[guarProductor],
      data:{rolesEsperados: [Productor]} 
      },

     
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborSueloRoutingModule { }
