import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalComponent } from '../principal/principal.component';
import { InicioComponent } from './inicio/inicio.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    InicioComponent,
    AlumnosComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    SharedModule
  ]
})
export class PrincipalModule { }
