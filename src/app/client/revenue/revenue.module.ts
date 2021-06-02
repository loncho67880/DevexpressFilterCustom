import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { RevenueComponent } from './revenue.component';
import * as fromRevenue from './store/revenue.reducer';
import { RevenueEffects } from './store/revenue.effect';

@NgModule({
  declarations: [RevenueComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild({}),
    StoreModule.forFeature(fromRevenue.revenueFeatureKey, fromRevenue.reducer),
    EffectsModule.forFeature([RevenueEffects]),
    NgbModule,
    SharedModule
  ],
  exports: [RevenueComponent]
})
export class RevenueModule { }
