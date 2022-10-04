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
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import {CardModule} from 'primeng/card';




registerLocaleData(localEs, "es-AR");


@NgModule({
  declarations: [
    AppComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    TooltipModule,
    RippleModule,
    InputTextModule,
    CardModule


  ],
  providers: [interceptorProvider, {provide: LOCALE_ID, useValue: 'es-AR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
