import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/Core/guards/login-guard';
import { LoginComponent } from './auth/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
    
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: '**', redirectTo: 'login',pathMatch: 'full' },

      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
