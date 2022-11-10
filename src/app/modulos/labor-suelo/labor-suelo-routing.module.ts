import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { CulGuardService as guarProductor } from 'src/app/Core/guards/cul-guard.service';
import { ListaLaborSueloComponent } from './listado/lista-labor-suelo.component';
import { ActualizarLaborComponent } from './modificar/actualizar-labor.component';
import { LaborNuevaComponent } from './nueva/labor-nueva.component';

const Productor = Roles.PRODUCTOR;
const ADMIN = Roles.ADMIN;
const routes: Routes = [

  {
    path: '',
    children: [

      { path: 'crearLabor',
      component:LaborNuevaComponent,
      canActivate:[guarProductor],
      data:{rolesEsperados: [Productor]} 
      },

      { path: 'listadoLaborSueloPorFinca',
      component:ListaLaborSueloComponent,
      canActivate:[guarProductor],
      data:{rolesEsperados: [ADMIN,Productor]} 
      },
      
      { path: 'modificarLabor/:id', 
      component: ActualizarLaborComponent, 
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
export class LaborSueloRoutingModule { }
