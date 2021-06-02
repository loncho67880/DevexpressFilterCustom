import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PocFilterEffects } from './store/pocFilter.effect';
import * as fromHome from './store/pocFilter.reducer';
import { TranslateModule } from '@ngx-translate/core';
import { PocFilterComponent } from './pocFilter.component';
import { PocRoutingModule } from './pocFilter-routing.module';
import { DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [PocFilterComponent],
  imports: [
    CommonModule,
    PocRoutingModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    StoreModule.forFeature(fromHome.pocFilterFeatureKey, fromHome.reducer),
    EffectsModule.forFeature([PocFilterEffects]),
    TranslateModule.forRoot()
  ],
  exports: [PocFilterComponent]
})
export class PocFilterModule { }
