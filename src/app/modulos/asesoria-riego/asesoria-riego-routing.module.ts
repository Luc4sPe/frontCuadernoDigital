import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { NuevaAsesoriaComponent } from './nueva-asesoria/nueva-asesoria.component';
import { CulGuardService as guarEncargadoAgri } from 'src/app/Core/guards/cul-guard.service';


const Encargado_Agricola = Roles.ENCARGADO_AGRICOLA;
const ADMIN=Roles.ADMIN;
const routes: Routes = [

  {
    path: '',
    children: [
    
      { path: 'nuevaAsesoria',
       component: NuevaAsesoriaComponent,
       canActivate:[guarEncargadoAgri],
       data:{rolesEsperados: [ADMIN,Encargado_Agricola]} },
      
    
     
  
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesoriaRiegoRoutingModule { }
