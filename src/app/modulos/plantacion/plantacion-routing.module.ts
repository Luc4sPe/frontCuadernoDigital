import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { NuevaPlantacionComponent } from './nueva/nueva-plantacion.component';
import { CulGuardService as guarProductor } from 'src/app/Core/guards/cul-guard.service';


const Productor = Roles.PRODUCTOR;
const routes: Routes = [
  {
    path: '',
      children: [

        { path: 'crearPlantacion',
        component: NuevaPlantacionComponent,
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
