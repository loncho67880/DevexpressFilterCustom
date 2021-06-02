import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { ContactusComponent } from './contactus.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromContactus from './store/contactus.reducer';
import { ContactusEffects } from './store/contactus.effect';
import { ContactUsRoutingModule } from './contactus-routing.module';

@NgModule({
  declarations: [ContactusComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild({extend: true}),
    StoreModule.forFeature(
      fromContactus.contactusFeatureKey,
      fromContactus.reducer
    ),
    EffectsModule.forFeature([ContactusEffects]),
    SharedModule,
    NgbModule,
    ContactUsRoutingModule
  ],
  exports: [ContactusComponent]
})
export class ContactusModule {}
