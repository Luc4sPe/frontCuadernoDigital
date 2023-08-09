import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { NuevaAsesoriaAgroComponent } from './nueva-asesoria-agro/nueva-asesoria-agro.component';
import { CulGuardService as guarEncargadoAgri } from 'src/app/Core/guards/cul-guard.service';

const Encargado_Agricola = Roles.ENCARGADO_AGRICOLA;
const Productor = Roles.PRODUCTOR;
const ADMIN=Roles.ADMIN;


const routes: Routes = [

  {
    path: '',
    children: [

      
    
      { path: 'nuevoAsesoriaAgroquimico',
       component: NuevaAsesoriaAgroComponent,
       canActivate:[guarEncargadoAgri],
       data:{rolesEsperados: [ADMIN,Encargado_Agricola]} },

      
       {path:'**', redirectTo:'listarAsesoriaPorFinca'}
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesoriaAgroquimicoRoutingModule { }
