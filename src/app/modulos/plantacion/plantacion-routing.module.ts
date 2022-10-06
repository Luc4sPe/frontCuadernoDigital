import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { CulGuardService as guarProductor } from 'src/app/Core/guards/cul-guard.service';
import { PlantacionNuevaComponent } from './nueva/plantacion-nueva.component';

const Productor = Roles.PRODUCTOR;

const routes: Routes = [
  {
    path: '',
    children: [

      { path: 'crearPlantacion',
      component:PlantacionNuevaComponent,
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
export class PlantacionRoutingModule { }
