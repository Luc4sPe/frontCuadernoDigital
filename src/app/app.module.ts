import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { interceptorProvider } from './Core/interceptors/cul-interceptor.service';
import localEs from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';

import{HttpClientModule} from '@angular/common/http';
import{FormsModule,ReactiveFormsModule } from '@angular/forms';

// external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
<<<<<<< Updated upstream
import { LoginComponent } from './auth/Login/login.component';

import { IndexComponent } from './index/index.component';
import { ListaComponent } from './modulos/usuario/listar/lista.component';

=======
>>>>>>> Stashed changes




registerLocaleData(localEs, "es-AR");


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< Updated upstream
    LoginComponent,
    
    IndexComponent,
    
    
=======
>>>>>>> Stashed changes
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [interceptorProvider, {provide: LOCALE_ID, useValue: 'es-AR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
