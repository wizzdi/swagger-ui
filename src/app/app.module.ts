import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule }    from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwaggerComponent } from './swagger/swagger.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    SwaggerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/FlexiCore/rest'}],
  bootstrap: [AppComponent],
  exports: [SwaggerComponent, LoginComponent]
})
export class AppModule { }
