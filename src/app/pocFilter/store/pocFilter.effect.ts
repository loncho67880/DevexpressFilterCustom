import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import { PocFilterService } from '../services/pocFilter.service';
import * as fromAction from './pocFilter.actions';

@Injectable()
export class PocFilterEffects {
  constructor(private actions$: Actions, private service: PocFilterService) {}

  loadAdvantageClientInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.requestLoadPocFilterAdvantagedClientInfo),
      switchMap(action =>
        this.service.loadAdvantagedClient(action.page).pipe(
          map(data => {
            return fromAction.loadAdvantagedClientInfo({ advantagedClient: data});
          }),
        ),
      )
    )
  );

}
