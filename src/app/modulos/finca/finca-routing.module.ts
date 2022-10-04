import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { CulGuardService as guarEncargadoAgricola } from 'src/app/Core/guards/cul-guard.service';
import { EditarFincaComponent } from './editar/editar-finca.component';
import { ListarFincaComponent } from './Listado/listar-finca.component';
import { FincaNuevaComponent } from './nueva/finca-nueva.component';


const Encargado_Agricola = Roles.ENCARGADO_AGRICOLA;
const routes: Routes = [
  {
    
      path: '',
      children: [

        { path: 'listadoFinca',
        component: ListarFincaComponent,
        canActivate:[guarEncargadoAgricola],
        data:{rolesEsperados: [Encargado_Agricola]} 
        },

        { path: 'crearFinca',
        component: FincaNuevaComponent,
        canActivate:[guarEncargadoAgricola],
        data:{rolesEsperados: [Encargado_Agricola]} 
        },
        { path: 'editarFinca',
        component: EditarFincaComponent,
        canActivate:[guarEncargadoAgricola],
        data:{rolesEsperados: [Encargado_Agricola]} 
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FincaRoutingModule { }
