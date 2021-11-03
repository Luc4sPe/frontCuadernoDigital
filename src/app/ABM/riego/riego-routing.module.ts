import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarRiegoComponent } from './editar/editar-riego.component';
import { ListarRiegoComponent } from './listar/listar-riego.component';
import { RiegoNuevoComponent } from './nuevo/riego-nuevo.component';

const routes: Routes = [

  {
    path: '', 
    children:
    [
      {path: '', component: ListarRiegoComponent},
      {path: 'nuevoRiego', component: RiegoNuevoComponent},
      {path: 'update/:id', component: EditarRiegoComponent},
      {path: '**', redirectTo: '',pathMatch: 'full'}
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiegoRoutingModule { }
