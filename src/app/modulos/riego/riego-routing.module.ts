import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarRiegoComponent } from './editar/editar-riego.component';
import { ListarRiegoComponent } from './listar/listar-riego.component';
import { ListarRiegosComponent } from './listarRiegoXUsuarios/listar-riegos.component';
import { RiegoNuevoComponent } from './nuevo/riego-nuevo.component';
import { Roles } from 'src/app/Core/enmus/roles';
import { CulGuardService as guarProductor } from 'src/app/Core/guards/cul-guard.service';

const Productor = Roles.PRODUCTOR;
const ADMIN = Roles.ADMIN;
const routes: Routes = [

  {
    path: '', 
    children:
    [
      { path: 'nuevoRiego',
      component:RiegoNuevoComponent,
      canActivate:[guarProductor],
      data:{rolesEsperados: [Productor]} 
      },

      { path: 'listadoRiegoPorFinca',
      component:ListarRiegoComponent,
      canActivate:[guarProductor],
      data:{rolesEsperados: [ADMIN,Productor]} 
      },

      { path: 'modificarRiego/:id', 
      component: EditarRiegoComponent, 
      canActivate: [guarProductor],
      data: { rolesEsperados: [ADMIN,Productor] },
      },
      
    
      {path: 'riegoPorNombreUsuario/:nombreUsuario', component: ListarRiegosComponent},
      {path: 'riegoPorUsuario/:idUsuario', component: ListarRiegosComponent},
      {path: '**', redirectTo: '',pathMatch: 'full'}
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiegoRoutingModule { }
