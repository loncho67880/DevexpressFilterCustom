import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { switchMap, map, delay } from 'rxjs/operators';

import { HomeService } from '../services/home.service';
import * as fromAction from './home.actions';

@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private service: HomeService) {}

  loadHomeInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.requestLoadHomeInfo),
      switchMap(action =>
        this.service.load().pipe(
          map(data => fromAction.loadHomeInfo({ home: data})),
        ),
      )
    )
  );

  loadPortfolioInto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.requestLoadHomePortfolioInfo),
      switchMap(action =>
        this.service.loadPortfolio().pipe(
          map(data => fromAction.loadPortfolioInfo({ portfolio: data})),
        ),
      )
    )
  );

  loadFiscalYearInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.requestLoadHomeFiscalYearInfo),
      switchMap(action =>
        this.service.loadFiscalYear().pipe(
          map(data => fromAction.loadFiscalYearInfo({ fiscalyear: data})),
        ),
      )
    )
  );

  loadIndicatorsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.requestLoadHomeIndicatorsInfo),
      switchMap(action =>
        this.service.loadIndicators().pipe(
          map(data => {
            return fromAction.loadIndicatorsInfo({ indicators: data});
          }),
        ),
      )
    )
  );

  loadAdvantageClientInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.requestLoadHomeAdvantagedClientInfo),
      switchMap(action =>
        this.service.loadAdvantagedClient(action.page, action.order).pipe(
          map(data => {
            return fromAction.loadAdvantagedClientInfo({ advantagedClient: data});
          }),
        ),
      )
    )
  );

  filterAdvantageClientInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.requestLoadHomeFilterInfo),
      switchMap(action =>
        this.service.loadFilterAdvantagedClient(action.page, action.filter, action.order).pipe(
          map(data => {
            return fromAction.loadFilterInfo({ advantagedClient: data});
          }),
        ),
      )
    )
  );

  loadColumnsFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.requestLoadHomeColumnsFilter),
      switchMap(action =>
        this.service.loadColumnsFilter().pipe(
          map(data => {
            return fromAction.loadColumnsHomeFilter({columns: data});
          }),
        ),
      )
    )
  );

  loadDistinctColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.requestLoadDistinctColumns),
      switchMap(action =>
        this.service.loadDistinctColumns().pipe(
          map(data => {
            return fromAction.loadDistinctColumnsInfo({columns: data});
          }),
        ),
      )
    )
  );
}
