import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';

import { ClientCommentsService } from '../services/ClientComments.service';
import * as fromStore from './clientcomments.reducer';
import * as fromActions from './clientcomments.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class ClientCommentsEffects {
  constructor(private actions$: Actions, private service: ClientCommentsService
    , private store: Store<fromStore.ClientCommentsState>) {}

  loadClientCommentsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadClientCommentsInfo),
      switchMap(action =>
        this.service.load(action.id, action.page).pipe(
          map(data => fromActions.loadClientCommentsInfo({ clientComments: data})),
        ),
      )
    )
  );

  createClientCommentsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestCreateClientCommentsInfo),
      switchMap((action) =>
          this.service.create(action.client).pipe(
            map(data => fromActions.loadcreateClientCommentsInfo({ response: data})),
          ),
      ),
      tap(resp => this.store.dispatch(fromActions.addClientCommentsInfo({clientComment: resp.response})))
    )
  );

  updateClientCommentsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestUpdateClientCommentsInfo),
      switchMap((action) =>
          this.service.update(action.client).pipe(
            map(data => fromActions.loadupdateClientCommentsInfo({ response: data})),
          ),
      ),
      tap(resp => this.store.dispatch(fromActions.updateClientCommentsInfo({clientComment: resp.response})))
    )
  );

  deleteClientCommentsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requesDeleteClientCommentsInfo),
      switchMap((action) =>
          this.service.delete(action.client).pipe(
            map(data => fromActions.loadDeleteClientCommentsInfo({client: action.client})),
          ),
      ),
      tap(resp => this.store.dispatch(fromActions.deleteClientCommentsInfo({client: resp.client})))
    )
  );

}
