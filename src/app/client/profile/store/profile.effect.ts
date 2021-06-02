import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { switchMap, map, delay } from 'rxjs/operators';

import { ProfileService } from '../services/profile.service';
import { loadProfileInfo, requestLoadProfileInfo } from './profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private service: ProfileService) {}

  loadHeaderInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadProfileInfo),
      switchMap(action =>
        this.service.load(action.id).pipe(
          map(data => loadProfileInfo({ profile: data})),
        ),
      )
    )
  );
}
