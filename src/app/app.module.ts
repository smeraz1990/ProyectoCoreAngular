import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
//uzar una apirest
import { HttpClientModule } from '@angular/common/http';



//Componentes
import { LoginComponent } from './components/login/login.component';
import { RouteerrorComponent } from './components/routeerror/routeerror.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RouteerrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
