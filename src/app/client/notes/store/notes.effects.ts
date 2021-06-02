
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { NotesService } from '../services/notes.service';
import * as fromActions from './notes.actions';

@Injectable()
export class NotesEffects {
  constructor(private actions$: Actions, private service: NotesService) { }

  loadClientNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadNotes),
      switchMap(action =>
        this.service.loadNotes(action.id).pipe(
          map(data => fromActions.loadNotes({ notes: data })),
        ),
      )
    )
  );

}
