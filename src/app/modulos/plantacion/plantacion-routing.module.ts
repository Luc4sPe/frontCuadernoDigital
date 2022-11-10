import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { CulGuardService as guarProductor } from 'src/app/Core/guards/cul-guard.service';
import { ObtenerPlantacionComponent } from './detalle/obtener-plantacion.component';
import { ListadoPlantacionComponent } from './listado/listado-plantacion.component';
import { ActualizarPlantacionComponent } from './modificar/actualizar-plantacion.component';
import { PlantacionNuevaComponent } from './nueva/plantacion-nueva.component';

const Productor = Roles.PRODUCTOR;
const ADMIN = Roles.ADMIN;

const routes: Routes = [
  {
    path: '',
    children: [

      { path: 'crearPlantacion',
      component:PlantacionNuevaComponent,
      canActivate:[guarProductor],
      data:{rolesEsperados: [ADMIN,Productor]} 
      },

      { path: 'listadoPlantacionPorCultivo',
      component:ListadoPlantacionComponent,
      canActivate:[guarProductor],
      data:{rolesEsperados: [ADMIN,Productor]} 
      },

      {path: 'detallePlantacion/:id', component: ObtenerPlantacionComponent,
      canActivate: [guarProductor],
      data: { rolesEsperados: [ADMIN,Productor] },},

      {path: 'modificarPlantacion/:id', component: ActualizarPlantacionComponent, 
      canActivate: [guarProductor],
      data: { rolesEsperados: [ADMIN,Productor] },
      },
 
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantacionRoutingModule { }
