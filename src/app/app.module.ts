import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
//uzar una apirest
import { HttpClientModule } from '@angular/common/http';

import { AppStoreModule } from './app-store.module';
import { EffectsModule } from '@ngrx/effects';



//Componentes
import { LoginComponent } from './components/login/login.component';
import { RouteerrorComponent } from './components/routeerror/routeerror.component';

import {AlumnosComponent, DialogContentAlumnoDialogComponent} from '../app/components/principal/alumnos/alumnos.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RouteerrorComponent,
    AlumnosComponent, 
    DialogContentAlumnoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AppStoreModule

  ],
  entryComponents: [AlumnosComponent, DialogContentAlumnoDialogComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
