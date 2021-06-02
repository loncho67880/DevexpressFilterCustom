import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { switchMap, map, delay } from 'rxjs/operators';
import { ClientRevenue } from '../models/clientRevenue';
import { RevenueService } from '../services/revenue.service';
import * as fromActions from './revenue.actions';

@Injectable()
export class RevenueEffects {
  constructor(private actions$: Actions, private service: RevenueService) {}

  loadClientRevenueInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadClientRevenueInfo),
      switchMap(action =>
        this.service.loadRevenue(action.id).pipe(
          map(data => fromActions.loadClientRevenueInfo({clientRevenue : (data[0] ? data[0] : new ClientRevenue()) })),
        ),
      )
    )
  );

  loadClientFeeInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadClientFeeInfo),
      switchMap(action =>
        this.service.loadFee(action.id).pipe(
          map(data => fromActions.loadClientFeeInfo({clientFee : data})),
        ),
      )
    )
  );
}
