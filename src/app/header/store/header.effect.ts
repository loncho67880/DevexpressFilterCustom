import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { switchMap, map, delay } from 'rxjs/operators';

import { HeaderService } from '../services/header.service';
import { loadHeaderInfo, requestLoadHeaderInfo, loadOptionsInfo, requestLoadHeaderOptionsInfo } from './header.actions';

@Injectable()
export class HeaderEffects {
  /**
   *
   */
  constructor(private actions$: Actions, private service: HeaderService) {}

  loadHeaderInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadHeaderInfo),
      switchMap(action =>
        this.service.load().pipe(
          map(data => loadHeaderInfo({ header: data})),
        ),
      )
    )
  );

  loadOptionsInto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadHeaderOptionsInfo),
      switchMap(action =>
        this.service.loadOptions().pipe(
          map(data => loadOptionsInfo({ options: data})),
        ),
      )
    )
  );
}
