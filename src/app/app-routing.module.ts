import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: '', redirectTo:'login', pathMatch:'full'
  },

  {path: 'login',
  loadChildren: () => import('./modulos/auth/auth.module').then(m => m.AuthModule)},

  {
    path:'inicio',
    loadChildren:() => import('./modulos/paginaInicio/inicio.module').then(m => m.InicioModule)
  },
  
  {path: 'index',
    loadChildren: () => import('./modulos/index/index.module').then(m => m.IndexModule) 
  },

  {
    path: 'usuario', 
    loadChildren: () => import('./modulos/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  
   {
    path: 'logs',
    loadChildren: () => import('./modulos/logs/logs.module').then(m => m.LogsModule)
  }, 

  {
    path: 'riego',
    loadChildren:() => import('./modulos/riego/riego.module').then(m => m.RiegoModule)
  },

  {
    path: 'cultivo',
    loadChildren:() => import('./modulos/cultivo/cultivo.module').then(m => m.CultivoModule)
  },

  {
    path: 'finca',
    loadChildren:() => import('./modulos/finca/finca.module').then(m => m.FincaModule)
  },

  // {
  //   path: 'plantacion',
  //   loadChildren:() => import('./modulos/plantacion/plantacion.module').then(m => m.PlantacionModule)
  // },


  {path: '**', redirectTo: 'index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
