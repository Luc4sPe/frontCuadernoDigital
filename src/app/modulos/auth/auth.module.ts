import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './auth/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {PasswordModule} from 'primeng/password';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthRoutingModule,
    FormsModule,
    RouterModule,
    PasswordModule
  ]
})
export class AuthModule { }
