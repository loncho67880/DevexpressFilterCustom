import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeEffects } from './store/home.effect';
import * as fromHome from './store/home.reducer';
import { TranslateModule} from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ArrowComponent } from './components/arrow/arrow.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ColumnHeaderComponent } from './components/columnHeader/columnHeader.component';
import { DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [HomeComponent, ArrowComponent, ColumnHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature(fromHome.homeFeatureKey, fromHome.reducer),
    EffectsModule.forFeature([HomeEffects]),
    NgbModule,
    SharedModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ], { relativeLinkResolution: 'legacy' }),
    MatTableModule,
    MatSortModule,
    MatListModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
