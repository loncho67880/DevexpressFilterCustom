import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, delay } from 'rxjs/operators';

import { ClientIssuesService } from '../services/ClientIssues.service';
import * as fromActions from './clientIssues.actions';
import * as fromStore from './clientIssues.reducer';

@Injectable()
export class ClientIssuesEffects {
  constructor(private actions$: Actions, private service: ClientIssuesService
    , private store: Store<fromStore.ClientIssuesState>) {}

  loadClientIssuesInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadClientIssuesInfo),
      switchMap(action =>
        this.service.load(action.id).pipe(
          map(data => fromActions.loadClientIssuesInfo({ clientIssues: data})),
        ),
      )
    )
  );

  loadActionsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadActionInfo),
      switchMap(action =>
        this.service.loadAction().pipe(
          map(data => fromActions.loadActionInfo({ actions: data})),
        ),
      )
    )
  );

  loadSeverityInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadSeverityInfo),
      switchMap(action =>
        this.service.loadSeverity().pipe(
          map(data => fromActions.loadSeverityInfo({ severitys: data})),
        ),
      )
    )
  );

  loadIssuesInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadIssueInfo),
      switchMap(action =>
        this.service.loadIssue().pipe(
          map(data => fromActions.loadIssueInfo({ issues: data})),
        ),
      )
    )
  );

  createClientIssuesInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestCreateClientIssuesInfo),
      switchMap(action =>
          this.service.create(action.client).pipe(
            map(data => fromActions.loadcreateClientIssuesInfo({ response: data})),
          ),
      )
    )
  );

  updateClientIssuesInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestUpdateClientIssuesInfo),
      switchMap(action =>
          this.service.update(action.client).pipe(
            map(data => fromActions.loadupdateClientIssuesInfo({ response: data})),
          ),
      )
    )
  );

  deleteClientIssuesInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requesDeleteClientIssuesInfo),
      switchMap(action =>
          this.service.delete(action.client).pipe(
            map(data => fromActions.loadDeleteClientIssuesInfo({client: action.client})),
          ),
      )
    )
  );
}
