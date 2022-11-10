import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { CulGuardService as guarEncargadoAgricola } from 'src/app/Core/guards/cul-guard.service';
import { EditarFincaComponent } from './editarFinca/editar-finca.component';
import { ListaFincaComponent } from './listado/lista-finca.component';
import { FincaNuevaComponent } from './nueva/finca-nueva.component';


const Encargado_Agricola = Roles.ENCARGADO_AGRICOLA;
const ADMIN = Roles.ADMIN;
const routes: Routes = [
  {
    
      path: '',
      children: [

        { path: 'listadoFinca',
        component: ListaFincaComponent,
        canActivate:[guarEncargadoAgricola],
        data:{rolesEsperados: [Encargado_Agricola]} 
        },

        { path: 'crearFinca',
        component: FincaNuevaComponent,
        canActivate:[guarEncargadoAgricola],
        data:{rolesEsperados: [Encargado_Agricola]} 
        },
        
        { path: 'modificar/:id',
        component: EditarFincaComponent,
        canActivate:[guarEncargadoAgricola],
        data:{rolesEsperados: [ADMIN,Encargado_Agricola]} 
        },
 
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FincaRoutingModule { }
