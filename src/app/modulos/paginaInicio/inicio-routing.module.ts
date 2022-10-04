import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioModule } from './inicio.module';
import { PaginaInicioComponent } from './inicio/pagina-inicio.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {path: '', component:PaginaInicioComponent},
      {path:'**', redirectTo:''}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
