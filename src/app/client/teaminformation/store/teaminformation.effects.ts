import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';
import { DownloadFileService } from 'src/app/shared/services/download-file.service';
import { TeamInformationService } from '../services/teaminformation.service';
import * as fromActions from './teaminformation.actions';

@Injectable()
export class TeamInformationEffects {
  constructor(
    private actions$: Actions,
    private service: TeamInformationService,
    private downloadService: DownloadFileService
  ) { }

  loadEngagementTeamRolesInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadEngagementTeamRolesInfo),
      switchMap((action) =>
        this.service
          .loadTeamRoles(action.id)
          .pipe(
            map((data) =>
              fromActions.loadEngagementTeamRolesInfo({
                engagementTeamRoles: data,
              })
            )
          )
      )
    )
  );

  loadClientExecutiveInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadClientExecutiveInfo),
      switchMap((action) =>
        this.service.loadClientExecutive(action.id).pipe(
            map((data: any) =>
              fromActions.loadClientExecutiveInfo({ clientExecutive: data })
            )
          )
      )
    )
  );

  loadAuditFirmInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadAuditFirmInfo),
      switchMap((action) =>
        this.service.loadAuditFirm().pipe(
            map((data: any) =>
              fromActions.loadAuditFirmInfo({ auditFirm: data })
            )
          )
      )
    )
  );

  loadCommitteeCategoryInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadCommitteeCategoryInfo),
      switchMap((action) =>
        this.service.loadCommitteeCategory().pipe(
            map((data: any) =>
              fromActions.loadCommitteeCategoryInfo({ committeeCategory: data })
            )
          )
      )
    )
  );

  relationshipStrengthInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestLoadRelationshipStrengthInfo),
      switchMap((action) =>
        this.service.loadRelationshipStrength().pipe(
            map((data: any) =>
              fromActions.loadRelationshipStrengthInfo({
                relationshipStrength: data,
              })
            )
          )
      )
    )
  );

  deleteClientExecutiveInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requesDeleteClientExecutiveInfo),
      switchMap((action) =>
        this.service.deleteClientExecutive(action.executive).pipe(
          map(data => fromActions.loadDeleteClientExecutiveInfo({ executive: action.executive })),
        ),
      )
    )
  );

  updateClientExecutiveInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestUpdateClientExecutiveRelationshipInfo),
      switchMap((action) =>
        this.service.updateClientExecutive(action.executive).pipe(
          map(data => fromActions.loadUpdateClientExecutiveRelationshipInfo({ executive: data })),
        ),
      )
    )
  );

  addClientExecutiveInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.requestAddClientExecutiveInfo),
      switchMap((action) =>
        this.service.create(action.executive).pipe(
          map(data => fromActions.loadAddClientExecutiveInfo({ executive: data })),
        ),
      )
    )
  );

  loadClientExecutiveReport$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromActions.requestClientExecutiveReport),
    tap( (action) => {
      this.service.getClientExecutiveReport(action.id).pipe(
        tap(res => this.downloadService.downloadFile(
          res, `client_executive ${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`)),
      ).subscribe();
    })), { dispatch : false }
  );
}
