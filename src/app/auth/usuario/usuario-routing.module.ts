import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoUsuarioComponent } from './nuevo/nuevo-usuario.component';

const routes: Routes = [

  {
    path: '', 
    children:[
      {path: 'nuevo',component: NuevoUsuarioComponent},
      {path: '**', redirectTo: 'nuevo'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
