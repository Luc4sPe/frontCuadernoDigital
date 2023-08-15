import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { NuevaAsesoriaAgroComponent } from './nueva-asesoria-agro/nueva-asesoria-agro.component';
import { CulGuardService as guarEncargadoAgri } from 'src/app/Core/guards/cul-guard.service';
import { ListadoAsesoriaComponent } from './listado-asesoria/listado-asesoria.component';
import { EditarAsesoriaAgroComponent } from './editar-asesoria-agro/editar-asesoria-agro.component';
import { ProductorListaAsesoriaAgroComponent } from './productor-lista-asesoria-agro/productor-lista-asesoria-agro.component';





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

       { path: 'listaAsesoriaAgroquimico',
       component: ListadoAsesoriaComponent,
       canActivate:[guarEncargadoAgri],
       data:{rolesEsperados: [ADMIN,Encargado_Agricola]} },

       { path: 'listaAsesoriaAgroProductor',
       component: ProductorListaAsesoriaAgroComponent,
       canActivate:[guarEncargadoAgri],
       data:{rolesEsperados: [ADMIN,Encargado_Agricola,Productor]} },
  
        { path: 'update/:id',
        component: EditarAsesoriaAgroComponent,
        canActivate:[guarEncargadoAgri],
        data:{rolesEsperados: [ADMIN,Encargado_Agricola]} },

       

      
       {path:'**', redirectTo:''}
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesoriaAgroquimicoRoutingModule { }
