import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RouteerrorComponent } from './components/routeerror/routeerror.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', redirectTo: 'login', pathMatch: 'full'},
  {path: 'principal', loadChildren: ()=> import("./components/principal/principal.module").then(x => x.PrincipalModule)},
  {path: '**', component: RouteerrorComponent,  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
