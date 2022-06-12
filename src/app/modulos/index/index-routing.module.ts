import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from 'src/app/Core/enmus/roles';
import { CulGuardService as guardUsuarios } from 'src/app/Core/guards/cul-guard.service';
import { IndexComponent  } from './index/index.component';

const ADMIN = Roles.ADMIN;
const USER = Roles.USER;
const ENCARGADO_AGRICOLA = Roles.ENCARGADO_AGRICOLA;
const PRODUCTOR = Roles.PRODUCTOR;
const GERENTE = Roles.GERENTE;

const routes: Routes = [
  {
    path: '',
    children:[
      {path: '', component:IndexComponent, canActivate:[guardUsuarios], data:{rolesEsperados:[USER,ADMIN,ENCARGADO_AGRICOLA,PRODUCTOR,GERENTE], }},
      {path:'**', redirectTo:''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
