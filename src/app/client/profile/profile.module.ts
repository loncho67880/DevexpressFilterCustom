import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileEffects } from './store/profile.effect';
import * as fromProfile from './store/profile.reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild({}),
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects]),
    NgbModule,
    SharedModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
