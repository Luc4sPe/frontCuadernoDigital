import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObtnerComponent } from './detalle/obtner.component';
import { ActualizarComponent } from './editar/actualizar.component';
import { ListaComponent } from './listar/lista.component';
import { NuevoUsuarioComponent } from './nuevo/nuevo-usuario.component';
import { CambioPasswordComponent } from './restablecerPassword/cambio-password/cambio-password.component';
import { EnviarEmailComponent } from './restablecerPassword/enviar-email/enviar-email.component';
import { CulGuardService as guarUsuarios } from 'src/app/Core/guards/cul-guard.service';
import { Roles } from 'src/app/Core/enmus/roles';
import { CambioContraseniaComponent } from './cambioPassword/cambio-contrasenia.component';
import { ActualizarPerfilComponent } from './perfil/actualizar-perfil.component';

const ADMIN = Roles.ADMIN;
const Productor = Roles.PRODUCTOR;
const Encargado_Agricola = Roles.ENCARGADO_AGRICOLA;
const routes: Routes = [

  {
    path: '', 
    children:
    [
      {path: '', component: ListaComponent,
        canActivate: [guarUsuarios],
        data: { rolesEsperados: [ADMIN] },},

      {path: 'nuevo',component: NuevoUsuarioComponent,
        canActivate: [guarUsuarios],
        data: { rolesEsperados: [ADMIN] },},

      {path: 'obtner/:id', component: ObtnerComponent,
        canActivate: [guarUsuarios],
        data: { rolesEsperados: [ADMIN,Encargado_Agricola] },},

      {
        path:'perfil/cambioContrasenia',component: CambioContraseniaComponent,
        canActivate: [guarUsuarios],
        data: { rolesEsperados: [ADMIN,Productor,Encargado_Agricola] },
      },

      {
        path:'perfil/actualizar',component: ActualizarPerfilComponent,
        canActivate: [guarUsuarios],
        data: { rolesEsperados: [ADMIN,Productor,Encargado_Agricola] },
      },

      {path: 'actualizar/:id', component:ActualizarComponent,
        canActivate: [guarUsuarios],
        data: { rolesEsperados: [ADMIN,Encargado_Agricola] },},

      {path: 'restablecerPassword/enviaremail',component: EnviarEmailComponent},
      {path: 'restablecer/cambioPassword/:tokenPassword',component: CambioPasswordComponent},
      {path: '**', redirectTo: 'list',pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
