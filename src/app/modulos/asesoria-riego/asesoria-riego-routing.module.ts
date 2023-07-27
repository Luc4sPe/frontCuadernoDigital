import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { NuevaAsesoriaComponent } from './nueva-asesoria/nueva-asesoria.component';
import { CulGuardService as guarEncargadoAgri } from 'src/app/Core/guards/cul-guard.service';
import { ModificarAsesoRiego } from 'src/app/Core/dto/modificar-aseso-riego';
import { ModificarAsesoriaComponent } from './modificar-asesoria/modificar-asesoria.component';
import { ListarAsesoriaComponent } from './listar-asesoria/listar-asesoria.component';
import { ListadoComponent } from './listadoPorFinca/listado.component';


const Encargado_Agricola = Roles.ENCARGADO_AGRICOLA;
const Productor = Roles.PRODUCTOR;
const ADMIN=Roles.ADMIN;
const routes: Routes = [

  {
    path: '',
    children: [

      
    
      { path: 'nuevaAsesoria',
       component: NuevaAsesoriaComponent,
       canActivate:[guarEncargadoAgri],
       data:{rolesEsperados: [ADMIN,Encargado_Agricola]} },

       { path: 'listaAsesoria',
       component: ListarAsesoriaComponent,
       canActivate:[guarEncargadoAgri],
       data:{rolesEsperados: [ADMIN,Encargado_Agricola]} },

       { path: 'listarAsesoriaPorFinca',
       component: ListadoComponent,
       canActivate:[guarEncargadoAgri],
       data:{rolesEsperados: [ADMIN,Encargado_Agricola,Productor]} },
       
  

       { path: 'editarAsesoriaRiego/:id',
       component: ModificarAsesoriaComponent,
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
export class AsesoriaRiegoRoutingModule { }
