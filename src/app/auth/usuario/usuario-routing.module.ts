import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObtnerComponent } from './detalle/obtner.component';
import { ActualizarComponent } from './editar/actualizar.component';
import { ListaComponent } from './listar/lista.component';
import { NuevoUsuarioComponent } from './nuevo/nuevo-usuario.component';

const routes: Routes = [

  {
    path: '', 
    children:
    [
      {path: '', component: ListaComponent},
      {path: 'nuevo',component: NuevoUsuarioComponent},
      {path: 'obtner/:id', component: ObtnerComponent},
      {path: 'actualizar/:id', component:ActualizarComponent},
      {path: '**', redirectTo: '',pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
