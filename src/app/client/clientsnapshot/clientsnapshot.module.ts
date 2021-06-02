import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { ClientSnapshotComponent } from './ClientSnapshot.component';
import { ClientSnapshotEffects } from './store/ClientSnapshot.effect';
import * as fromClientSnapshot from './store/ClientSnapshot.reducer';
import * as fromClientComments from './components/comments/store/clientcomments.reducer';
import * as fromClientIssues from './components/issues/store/clientIssues.reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CommentsComponent } from './components/comments/clientComments.component';
import { IssuesComponent } from './components/issues/clientIssues.component';
import { ClientCommentsEffects } from './components/comments/store/clientcomments.effect';
import { SharedModule } from '../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { ClientIssuesEffects } from './components/issues/store/clientIssues.effect';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatListModule } from '@angular/material/list';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [ClientSnapshotComponent, CommentsComponent, IssuesComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule.forChild({}),
    StoreModule.forFeature(fromClientSnapshot.ClientSnapshotFeatureKey, fromClientSnapshot.reducer),
    StoreModule.forFeature(fromClientComments.ClientCommentsFeatureKey, fromClientComments.reducer),
    StoreModule.forFeature(fromClientIssues.ClientIssuesFeatureKey, fromClientIssues.reducer),
    EffectsModule.forFeature([ClientSnapshotEffects, ClientCommentsEffects, ClientIssuesEffects]),
    NgbModule,
    SharedModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    InfiniteScrollModule,
    MatListModule,
    ScrollingModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [ClientSnapshotComponent]
})
export class ClientSnapshotModule { }
