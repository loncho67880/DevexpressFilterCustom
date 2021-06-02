import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { ClientSnapshotService } from '../services/clientSnapshot.service';
import * as fromActions from './clientSnapshot.actions';

@Injectable()
export class ClientSnapshotEffects {
  constructor(private actions$: Actions, private service: ClientSnapshotService) { }

  loadClientSnapshotInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadClientSnapshotInfo),
      switchMap(action =>
        this.service.load(action.id).pipe(
          map(data => fromActions.loadClientSnapshotInfo({ clientSnapshot: data })),
        ),
      )
    )
  );

  loadRelationshipVulnerability$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadRelationshipVulnerability),
      switchMap(action =>
        this.service.loadRelationShipVulnerability().pipe(
          map(data => fromActions.loadRelationshipVulnerability({ relationshipVulnerability: data })),
        ),
      )
    )
  );

  loadCriticalPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadCriticalPhase),
      switchMap(action =>
        this.service.loadCriticalPhase().pipe(
          map(data => fromActions.loadCriticalPhase({ criticalPhase: data })),
        ),
      )
    )
  );

  loadActiveRfp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadActiveRfp),
      switchMap(action =>
        this.service.loadActiveRfp().pipe(
          map(data => fromActions.loadActiveRfp({ activeRfp: data })),
        ),
      )
    )
  );

  loadRetentionOutcome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadRetentionDetailsOutcome),
      switchMap(action =>
        this.service.loadRetentionDetailsOutcome().pipe(
          map(data => fromActions.loadRetentionDetailsOutcome({ retentionDetailsOutcome: data })),
        ),
      )
    )
  );

  loadRetentionReason$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadReasonsRFP),
      switchMap(action =>
        this.service.loadReasonsRFP().pipe(
          map(data => fromActions.loadReasonsRFP({ ReasonsRFP: data })),
        ),
      )
    )
  );

  loadReasonsRetentionLoss$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestReasonsRetentionLoss),
      switchMap(action =>
        this.service.loadReasonsRetentionLoss().pipe(
          map(data => fromActions.loadReasonsRetentionLoss({ ReasonsRetentionLoss: data })),
        ),
      )
    )
  );

  loadPriority$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestPriority),
      switchMap(action =>
        this.service.loadPriority().pipe(
          map(data => fromActions.loadPriority({ Priority: data })),
        ),
      )
    )
  );

  loadClientRetentionDetailsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadClientRetentionDetails),
      switchMap(action =>
        this.service.loadClientRetentionDetails(action.id).pipe(
          map(data => fromActions.loadClientRetentionDetails({ clientRetentionDetails: data })),
        ),
      )
    )
  );

  createClientRetentionDetailsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestCreateClientRetentionDetails),
      switchMap(action =>
        this.service.createClientRetentionDetails(action.clientRetentionDetails).pipe(
          map(data => fromActions.loadCreateClientRetentionDetails({ clientRetentionDetails: data })),
        ),
      )
    )
  );

  editClientRetentionDetailsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestEditClientRetentionDetails),
      switchMap(action =>
        this.service.updateClientRetentionDetails(action.clientRetentionDetails).pipe(
          map(data => fromActions.loadEditClientRetentionDetails({ clientRetentionDetails: data })),
        ),
      )
    )
  );

  deleteClientRetentionDetailsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestDeleteClientRetentionDetails),
      switchMap(action =>
        this.service.deleteClientRetentionDetails(action.id).pipe(
          map(data => fromActions.loadDeleteClientRetentionDetails({ id: action.id })),
        ),
      )
    )
  );

  loadClientVulnerabilityRatingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadClientVulnerabilityRating),
      switchMap(action =>
        this.service.loadClientVulnerabilityRating(action.id).pipe(
          map(data => fromActions.loadClientVulnerabilityRating({ clientVulnerabilityRating: data })),
        ),
      )
    )
  );

  createClientVulnerabilityRatingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestCreateClientVulnerabilityRating),
      switchMap(action =>
        this.service.createClientVulnerabilityRating(action.clientVulnerabilityRating).pipe(
          map(data => fromActions.loadCreateClientVulnerabilityRating({ clientVulnerabilityRating: data })),
        ),
      )
    )
  );

  editClientVulnerabilityRatingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestEditClientVulnerabilityRating),
      switchMap(action =>
        this.service.updateClientVulnerabilityRating(action.clientVulnerabilityRating).pipe(
          map(data => fromActions.loadEditClientVulnerabilityRating({ clientVulnerabilityRating: data })),
        ),
      )
    )
  );
}
