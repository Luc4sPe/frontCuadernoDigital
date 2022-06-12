import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: '', redirectTo:'auth', pathMatch:'full'
  },

  {path: 'login',
  loadChildren: () => import('./modulos/auth/auth.module').then(m => m.AuthModule)},
  
  {path: 'index',
    loadChildren: () => import('./modulos/index/index.module').then(m => m.IndexModule) 
  },

  {
    path: 'usuario', 
    loadChildren: () => import('./modulos/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  
  

  {
    path: 'riego',
    loadChildren:() => import('./modulos/riego/riego.module').then(m => m.RiegoModule)
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
