import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../../login/user.effects';
import { StoreModule } from '@ngrx/store';
import { reducer, userFeatureKey } from '../../login/user.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(userFeatureKey, reducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UsersStoreModule { }