import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SwaggerComponent} from "./swagger/swagger.component";
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'swagger', component: SwaggerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
