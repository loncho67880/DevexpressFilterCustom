import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { TeaminformationComponent } from './teaminformation.component';
import { TeamInformationEffects } from './store/teaminformation.effects';
import { EffectsModule } from '@ngrx/effects';
import * as fromTeamInformation from './store/teaminformation.reducer';
import { ClientExecutiveComponent } from './components/clientExecutive.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [TeaminformationComponent, ClientExecutiveComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild({ extend: true }),
    SharedModule,
    NgbModule,
    MatSelectModule,
    StoreModule.forFeature(
      fromTeamInformation.teamInformationFeatureKey,
      fromTeamInformation.reducer
    ),
    BsDropdownModule.forRoot(),
    EffectsModule.forFeature([TeamInformationEffects]),
    BsDatepickerModule.forRoot()
  ],
  exports: [TeaminformationComponent],
})
export class TeaminformationModule {}
