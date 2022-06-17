import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './listado/lista.component';
import { CulGuardService as guardUsuario } from 'src/app/Core/guards/cul-guard.service';
import { Roles } from 'src/app/Core/enmus/roles';

const ADMIN = Roles.ADMIN;
const routes: Routes = [
  {
    
      path: '',
      children: [
       // {path: '', redirectTo:'listado'},
        {
          path: 'listado',
          component: ListaComponent,
          canActivate: [guardUsuario],
          data: { rolesEsperados: [ADMIN] },
        },
        { path: '**', redirectTo: 'listado' },
      ],
    },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
