import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
//uzar una apirest
import { HttpClientModule } from '@angular/common/http';

import { AppStoreModule } from './app-store.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';



//Componentes
import { LoginComponent } from './components/login/login.component';
import { RouteerrorComponent } from './components/routeerror/routeerror.component';

import {AlumnosComponent, DialogContentAlumnoDialogComponent} from '../app/components/principal/alumnos/alumnos.component';
import {MateriasComponent, DialogCursoComponent} from '../app/components/principal/materias/materias.component'
import {InscripcionesComponent, DialogInscripcionComponent} from '../app/components/principal/inscripciones/inscripciones.component'
import {UsuariosComponent,DialogContentUsuarioDialogComponent} from '../app/components/principal/usuarios/usuarios.component'
import { SiNoPipe } from './si-no.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RouteerrorComponent,
    AlumnosComponent, 
    DialogContentAlumnoDialogComponent,
    MateriasComponent,
    DialogCursoComponent,
    InscripcionesComponent,
    DialogInscripcionComponent,
    UsuariosComponent,
    DialogContentUsuarioDialogComponent,
    SiNoPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AppStoreModule,
    StoreModule,
    StoreDevtoolsModule,
    EffectsModule

  ],
  entryComponents: [AlumnosComponent, DialogContentAlumnoDialogComponent,
                    MateriasComponent,DialogCursoComponent,
                    InscripcionesComponent,DialogInscripcionComponent,
                    UsuariosComponent,DialogContentUsuarioDialogComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
