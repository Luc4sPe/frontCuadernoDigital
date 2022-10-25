import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: '', redirectTo:'auth', pathMatch:'full'
  },

  {path: 'auth',
  loadChildren: () => import('./modulos/auth/auth.module').then(a => a.AuthModule)},

  {
    path:'inicio',
    loadChildren:() => import('./modulos/paginaInicio/inicio.module').then(i => i.InicioModule)
  },
  
  {path: 'index',
    loadChildren: () => import('./modulos/index/index.module').then(i => i.IndexModule) 
  },

  {
    path: 'usuario', 
    loadChildren: () => import('./modulos/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  
   {
    path: 'logs',
    loadChildren: () => import('./modulos/logs/logs.module').then(l => l.LogsModule)
  }, 

  {
    path: 'riego',
    loadChildren:() => import('./modulos/riego/riego.module').then(r => r.RiegoModule)
  },

  {
    path: 'cultivo',
    loadChildren:() => import('./modulos/cultivo/cultivo.module').then(c => c.CultivoModule)
  },

  {
    path: 'finca',
    loadChildren:() => import('./modulos/finca/finca.module').then(f => f.FincaModule)
  },

  {
    path: 'cuadro',
    loadChildren:() => import('./modulos/cuadro/cuadro.module').then(c => c.CuadroModule)
  },

   {
     path: 'plantacion',
     loadChildren:() => import('./modulos/plantacion/plantacion.module').then(p => p.PlantacionModule)
   },

   {
    path: 'laborSuelo',
    loadChildren:() => import('./modulos/labor-suelo/labor-suelo.module').then(l => l.LaborSueloModule)
  },

  {path: '**', redirectTo: 'auth', pathMatch: 'full' }


 // {path: '**', redirectTo: 'index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
