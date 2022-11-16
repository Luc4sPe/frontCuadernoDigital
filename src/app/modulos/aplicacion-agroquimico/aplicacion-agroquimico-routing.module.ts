import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { CulGuardService as guarProductor } from 'src/app/Core/guards/cul-guard.service';
import { ModificarAgroquimicoComponent } from '../agroquimico/modificar/modificar-agroquimico.component';
import { ListadoAplicacionAgroComponent } from './listado/listado-aplicacion-agro.component';
import { ModificarAplicacionComponent } from './modificar/modificar-aplicacion.component';
import { NuevaAplicacionAgroComponent } from './nueva/nueva-aplicacion-agro.component';

const Productor = Roles.PRODUCTOR;
const ADMIN = Roles.ADMIN;
const routes: Routes = [

  {
    path: '', 
    children:
    [
      { path: 'nuevaAplicacionAgro',
      component:NuevaAplicacionAgroComponent,
      canActivate:[guarProductor],
      data:{rolesEsperados: [Productor]} 
      },

      { path: 'listadoAplicacionAgroPorFinca',
      component:ListadoAplicacionAgroComponent,
      canActivate:[guarProductor],
      data:{rolesEsperados: [ADMIN,Productor]} 
      },

      { path: 'modificarAplicacion/:id',
      component:ModificarAplicacionComponent,
      canActivate:[guarProductor],
      data:{rolesEsperados: [ADMIN,Productor]} 
      },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicacionAgroquimicoRoutingModule { }
