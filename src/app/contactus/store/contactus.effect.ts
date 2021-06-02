import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import { ContactusService } from '../services/contactus.service';
import {
  loadcontactusInfo,
  requestLoadcontactusInfo,
} from './contactus.actions';

@Injectable()
export class ContactusEffects {
  constructor(private actions$: Actions, private service: ContactusService) { }

  loadHeaderInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadcontactusInfo),
      switchMap(action =>
        this.service.load().pipe(
          map(data => loadcontactusInfo({ contactus: data})),
        ),
      )
    )
  );
}
