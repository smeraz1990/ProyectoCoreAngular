import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { LoginModule } from './components/login/login.module'
import { UsersStoreModule } from './components/principal/users-store/users-store.module';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    LoginModule,
    UsersStoreModule,
  ]
})
export class AppStoreModule { }
