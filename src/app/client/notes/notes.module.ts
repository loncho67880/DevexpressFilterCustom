import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NotesComponent } from './notes.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromNotes from './store/notes.reducer';
import { NotesEffects } from './store/notes.effects';

@NgModule({
  declarations: [NotesComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild({ extend: true }),
    SharedModule,
    NgbModule,
    StoreModule.forFeature(
      fromNotes.clientNotesFeatureKey,
      fromNotes.reducer
    ),
    EffectsModule.forFeature([NotesEffects])
  ],
  exports: [NotesComponent],
})
export class NotesModule { }
