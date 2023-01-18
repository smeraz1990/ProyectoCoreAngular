import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { InicioComponent } from './inicio/inicio.component';
import { PrincipalComponent } from './principal.component';

const routes: Routes = [
  {path:'', component: PrincipalComponent,children:[
    {path: '', component: InicioComponent},
    {path: 'alumnos', component: AlumnosComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
