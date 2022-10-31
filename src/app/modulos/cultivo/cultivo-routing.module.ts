import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { NuevoProductorComponent } from './productor/nuevo/nuevo-productor.component';
import { CulGuardService as guarEncargadoAgri } from 'src/app/Core/guards/cul-guard.service';
import { ListadoProductorComponent } from './productor/listar/listado-productor.component';
import { NuevoCultivoComponent } from './cultivo/nuevo/nuevo-cultivo.component';
import { ListaCultivoComponent } from './cultivo/listado/lista-cultivo.component';
import { ObtenerCultivoComponent } from './cultivo/detalle/obtener-cultivo.component';


const Encargado_Agricola = Roles.ENCARGADO_AGRICOLA;
const ADMIN=Roles.ADMIN;
const routes: Routes = [
  {
    path: '',
    children: [
    
      { path: 'nuevo',
       component: NuevoProductorComponent,
       canActivate:[guarEncargadoAgri],
       data:{rolesEsperados: [ADMIN,Encargado_Agricola]} },
      
    
      { path: 'usuariosPorNombreRol/:nombre',
       component: ListadoProductorComponent,
       canActivate:[guarEncargadoAgri],
       data:{rolesEsperados: [ADMIN,Encargado_Agricola]} },

       { path: 'crearCultivo',
       component: NuevoCultivoComponent,
       canActivate:[guarEncargadoAgri],
       data:{rolesEsperados: [ADMIN,Encargado_Agricola]} },

       { path: 'listado',
       component: ListaCultivoComponent,
       canActivate:[guarEncargadoAgri],
       data:{rolesEsperados: [ADMIN,Encargado_Agricola]} },

       {path: 'detalle/:id', component: ObtenerCultivoComponent,
       canActivate: [guarEncargadoAgri],
       data: { rolesEsperados: [ADMIN,Encargado_Agricola] },},


  
      
  
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CultivoRoutingModule { }
