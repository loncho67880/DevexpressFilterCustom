import { Component, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromActions from './store/teaminformation.actions';
import * as fromStore from './store/teaminformation.reducer';
import * as fromSelector from './store/teaminformation.selectors';

import { EngagementTeamRoles } from './models/engagementTeamRoles';
import { ClientExecutive } from './models/clientExecutive';
import { RelationshipStrength } from './models/relationshipStrength';
import { CommitteesListJSON } from './models/committeesListJSON';
import { CommitteeCategory } from './models/committeeCategory';
import { AuditFirm } from './models/auditFirm';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team-information',
  templateUrl: './teaminformation.component.html',
  styleUrls: ['./teaminformation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeaminformationComponent {
  modalRef: BsModalRef;
  loading$: Observable<boolean>;
  isCreated: boolean;
  optionSelected: any;
  id: string;
  isCollapsed = true;
  canOpenModal = true;
  responseUpdate$: Observable<ClientExecutive>;
  responseDelete$: Observable<ClientExecutive>;
  clientSelected: ClientExecutive;
  engagementTeamRolesInfo$: Observable<EngagementTeamRoles>;
  clientExecutiveInfo$: Observable<ClientExecutive[]>;
  relationshipStrength$: Observable<RelationshipStrength[]>;
  committeeCategoryInfo$: Observable<CommitteeCategory[]>;
  auditFirmInfo$: Observable<AuditFirm[]>;
  auditFirmInfo: AuditFirm[];
  relationshipStrengthList: RelationshipStrength[];

  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private store: Store<fromStore.TeamInformationState>,

  ) {
    this.store.dispatch(fromActions.requestLoadRelationshipStrengthInfo());
    this.store.dispatch(fromActions.requestLoadAuditFirmInfo());
    this.auditFirmInfo$ = this.store.select(fromSelector.auditFirmCategoryInfo);
    this.auditFirmInfo$.subscribe(list => {
      if (list) {
        this.auditFirmInfo = list;
      }
    });
    this.relationshipStrength$ = this.store.select(fromSelector.relationshipStrengthInfo);
    this.committeeCategoryInfo$ = this.store.select(fromSelector.committeeCategoryInfo);
    this.store.select(fromSelector.relationshipStrengthInfo).subscribe(info => this.relationshipStrengthList = info);
    this.route.paramMap.subscribe((param) => {
      this.id = param.get('id');
      this.store.dispatch(fromActions.requestLoadEngagementTeamRolesInfo({ id: this.id }));
      this.engagementTeamRolesInfo$ = this.store.select(fromSelector.engagementTeamRolesInfo);
    });
    this.route.paramMap.subscribe((param) => {
      this.id = param.get('id');
      this.store.dispatch(fromActions.requestLoadClientExecutiveInfo({ id: this.id }));
      this.clientExecutiveInfo$ = this.store.select(fromSelector.clientExecutiveInfo);
    });
  }

  openConfirm(clientExcutive: ClientExecutive, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.asignValues(clientExcutive);
  }

  openEdit(clientExcutive: ClientExecutive, template: TemplateRef<any>) {
    this.asignValues(clientExcutive);
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-lg' }));
    this.store.dispatch(fromActions.loadEditExecutiveInfo({ executive: this.clientSelected }));
  }

  openConfirmRelationship(clientExcutive: ClientExecutive, template: TemplateRef<any>, id: string) {
    const updatedClient = { ...clientExcutive, relationshipStrengthId: id };
    this.clientSelected = updatedClient;

    this.modalRef = this.modalService.show(template);
  }

  openModal(template: TemplateRef<any>) {
    this.asignValues(new ClientExecutive());
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-lg' }));
  }

  closeModal() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
  }

  updateRelationship() {
    this.store.dispatch(fromActions.requestUpdateClientExecutiveRelationshipInfo({ executive: this.clientSelected }));
    this.responseUpdate$ = this.store.select(fromSelector.responseUpdate);
    this.closeModal();
  }

  delete() {
    this.store.dispatch(fromActions.requesDeleteClientExecutiveInfo({ executive: this.clientSelected }));
    this.responseDelete$ = this.store.select(fromSelector.responseDelete);
    this.closeModal();
  }

  asignValues(clientSelected: ClientExecutive) {
    this.clientSelected = { ...clientSelected };
  }

  getRelationshipName(id: string) {
    if (this.relationshipStrengthList) {
      const value =  this.relationshipStrengthList.find(i => i.id === id);
      return value?.value;
    } else {
      return '';
    }
  }

  listCommitees(committeesListJSON: string): CommitteesListJSON[] {
    const list: CommitteesListJSON[] =  committeesListJSON ? (JSON.parse(committeesListJSON) ) : [];
    return list;
  }

  createUrl(id: string) {
    return `${environment.URL}${id}`;
  }

  auditFirmSelected(idAuditFirm: string): string {
    if (this.auditFirmInfo) {
      const audit = this.auditFirmInfo.find(x => x.id === idAuditFirm);
      if (audit) {
        return audit.displayName;
      } else {
        return '';
      }
    }
  }

  exportHistoricalChanges() {
    this.store.dispatch(fromActions.requestClientExecutiveReport({id: this.id}));
  }

  rowspanCrossposition(client: ClientExecutive) {
    if (client && client.crossBoardPosition && client.crossBoardPosition.length > 0) {
      return client.crossBoardPosition.length;
    } else {
      return 1;
    }
  }
}
