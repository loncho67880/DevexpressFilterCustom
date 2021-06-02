import { Component, ChangeDetectionStrategy, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClientExecutive } from '../models/clientExecutive';
import { RelationshipStrength } from '../models/relationshipStrength';
import * as fromActions from '../store/teaminformation.actions';
import * as fromStore from '../store/teaminformation.reducer';
import * as fromSelector from '../store/teaminformation.selectors';
import { ActivatedRoute } from '@angular/router';
import { CrossBoardPosition } from '../models/crossBoardPosition';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonUtils } from 'src/app/shared/utils/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as fromActionsClientSnapshot from '../../clientsnapshot/store/clientsnapshot.actions';
import * as fromStoreClientSnapshot from '../../clientsnapshot/store/clientsnapshot.reducer';
import * as fromSelectorClientSnapshot from '../../clientsnapshot/store/clientsnapshot.selectors';
import { ClientSnapshot } from '../../clientsnapshot/models/clientSnapshot';
import { CommitteeCategory } from '../models/committeeCategory';
import { AuditFirm } from '../models/auditFirm';
import { TranslateService } from '@ngx-translate/core';
import { CommitteesListJSON } from '../models/committeesListJSON';

@Component({
  selector: 'app-client-executive',
  templateUrl: './clientExecutive.component.html',
  styleUrls: ['./clientExecutive.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientExecutiveComponent {

  modalRef: BsModalRef;
  @Output() CloseEmmiter = new EventEmitter();
  @Input() set clientSelected(client: ClientExecutive) {
    this.clientExecutive = { ...client };
    if (!this.clientExecutive.id) {
      this.relationshipStrengthDropdown = null;
      this.committeeCategoryDropdown = null;
      this.auditFirmDropdown = null;
    }
  }
  isAdding: boolean;
  clientExecutive: ClientExecutive = new ClientExecutive();
  crossBoardPositionAdd: CrossBoardPosition = new CrossBoardPosition();
  crossBoardPositionDelete: CrossBoardPosition = new CrossBoardPosition();
  id: string;
  form: FormGroup;
  companyId: number;
  ClientSnapshotInfo$: Observable<ClientSnapshot>;
  clientSelected$: Observable<ClientExecutive>;
  listAddCrossBoard: string[] = [];
  relationshipStrength$: Observable<RelationshipStrength[]>;
  relationshipStrength: RelationshipStrength[];
  committeeCategory$: Observable<CommitteeCategory[]>;
  auditFirm$: Observable<AuditFirm[]>;
  committeeCategory: CommitteeCategory[];
  auditFirm: AuditFirm[];
  relationshipStrengthDropdown: RelationshipStrength;
  committeeCategoryDropdown: CommitteeCategory;
  auditFirmDropdown: AuditFirm;
  committeeCategoryDropdownBoarding: CommitteeCategory;
  auditFirmDropdownBoarding: AuditFirm;

  constructor(private store: Store<fromStore.TeamInformationState>
    , private route: ActivatedRoute
    , private modalService: BsModalService
    , private common: CommonUtils
    , private fb: FormBuilder
    , private storeClientSnapshot: Store<fromStoreClientSnapshot.ClientSnapshotState>
    , private translate: TranslateService) {
    this.form = this.fb.group({
      seachText: ['']
    });
    this.clientExecutive = new ClientExecutive();
    this.clientExecutive.crossBoardPosition = [];
    this.store.dispatch(fromActions.requestLoadRelationshipStrengthInfo());
    this.relationshipStrength$ = this.store.select(fromSelector.relationshipStrengthInfo);
    this.store.dispatch(fromActions.requestLoadCommitteeCategoryInfo());
    this.committeeCategory$ = this.store.select(fromSelector.committeeCategoryInfo);
    this.store.dispatch(fromActions.requestLoadAuditFirmInfo());
    this.auditFirm$ = this.store.select(fromSelector.auditFirmCategoryInfo);
    this.route.paramMap.subscribe((param) => {
      this.id = param.get('id');
    });
    this.storeClientSnapshot.dispatch(fromActionsClientSnapshot.requestLoadClientSnapshotInfo({ id: this.id }));
    this.ClientSnapshotInfo$ = this.store.select(fromSelectorClientSnapshot.ClientSnapshotInfo);
    this.ClientSnapshotInfo$.subscribe(client => {
      this.companyId = client.companyId;
    });
    this.clientSelected$ = this.store.select(fromSelector.clientExecutiveEditInfo);
    this.clientSelected$.subscribe(executive => {
      this.clientExecutive.roleStartDate = new Date();
      if (executive && executive.id) {
        this.clientExecutive = { ...executive };
        if (!this.clientExecutive.crossBoardPosition) {
          this.clientExecutive.crossBoardPosition = [];
        }
        // Asign values dropdown
        this.relationshipStrength$.subscribe(relation => {
          if (relation) {
            this.relationshipStrength = relation;
            const relationExecutive = this.relationshipStrength.find(x => this.clientExecutive.relationshipStrengthId === x.id);
            if (relationExecutive) {
              this.relationshipStrengthDropdown = relationExecutive;
            }
          }
        });
        this.committeeCategory$.subscribe(commites => {
          if (commites) {
            this.committeeCategory = commites;
            if (this.commiteJson(this.clientExecutive.committeesListJSON)) {
              const commiteExecutive =
                      this.committeeCategory.find(x => this.commiteJson(this.clientExecutive.committeesListJSON).id === x.id);
              if (commiteExecutive) {
                this.committeeCategoryDropdown = commiteExecutive;
              }
            }
          }
        });
        this.auditFirm$.subscribe(audits => {
          if (audits) {
            this.auditFirm = audits;
            const auditFirm = this.auditFirm.find(x => this.clientExecutive.auditFirmAlumni === x.id);
            if (auditFirm) {
              this.auditFirmDropdown = auditFirm;
            }
          }
        });
      } else {
        this.relationshipStrengthDropdown = null;
        this.committeeCategoryDropdown = null;
        this.auditFirmDropdown = null;
        this.committeeCategory$.subscribe(commites => {
          if (commites) {
            this.committeeCategory = commites;
          }
        });
        this.auditFirm$.subscribe(audits => {
          if (audits) {
            this.auditFirm = audits;
          }
        });
        this.relationshipStrength$.subscribe(relation => {
          if (relation) {
            this.relationshipStrength = relation;
          }
        });
      }
    });
  }

  closeModal() {
    this.CloseEmmiter.emit();
  }

  selectRelation(relation: RelationshipStrength) {
    this.relationshipStrengthDropdown = relation;
  }

  selectCommite(comitte: CommitteeCategory) {
    this.committeeCategoryDropdown = comitte;
  }

  selectCommiteBoarding(comitte: CommitteeCategory) {
    this.committeeCategoryDropdownBoarding = comitte;
  }

  selectAudit(audit: AuditFirm) {
    this.auditFirmDropdown = audit;
  }

  selectAuditBoarding(audit: AuditFirm) {
    this.auditFirmDropdownBoarding = audit;
  }

  save() {
    this.assignEmptyGuid();
    if (this.clientExecutive.id) {
      this.clientExecutive.companyGuid = this.id;
      this.clientExecutive.relationshipStrengthId = this.relationshipStrengthDropdown.id;
      this.clientExecutive.companyId = this.companyId;
      this.clientExecutive.auditFirmAlumni = this.auditFirmDropdown.id;
      this.clientExecutive.committeesListJSON = this.jsonCommite(this.committeeCategoryDropdown);
      this.store.dispatch(fromActions.requestUpdateClientExecutiveRelationshipInfo({ executive: this.clientExecutive }));
    } else {
      this.clientExecutive.companyGuid = this.id;
      this.clientExecutive.relationshipStrengthId = this.relationshipStrengthDropdown.id;
      this.clientExecutive.companyId = this.companyId;
      this.clientExecutive.auditFirmAlumni = this.auditFirmDropdown.id;
      this.clientExecutive.committeesListJSON = this.jsonCommite(this.committeeCategoryDropdown);
      this.store.dispatch(fromActions.requestAddClientExecutiveInfo({ executive: this.clientExecutive }));
    }
    this.CloseEmmiter.emit();
  }

  cleanPopup() {
    this.clientExecutive = new ClientExecutive();
    this.clientExecutive.crossBoardPosition = [];
    this.relationshipStrengthDropdown = null;
    this.committeeCategoryDropdown = null;
  }

  addCrossBoarding() {
    this.crossBoardPositionAdd.id = this.common.newGuid(); // Generate guid for identify and delete
    this.crossBoardPositionAdd.currentAuditor = this.auditFirmDropdownBoarding.id;
    this.crossBoardPositionAdd.committeesListJSON = this.jsonCommite(this.committeeCategoryDropdownBoarding);
    this.listAddCrossBoard.push(this.crossBoardPositionAdd.id);
    if (!this.clientExecutive.crossBoardPosition) {
      this.clientExecutive.crossBoardPosition = [];
    }
    this.clientExecutive.crossBoardPosition = [this.crossBoardPositionAdd, ...this.clientExecutive.crossBoardPosition];
    this.crossBoardPositionAdd = new CrossBoardPosition();
    this.isAdding = false;
    this.auditFirmDropdownBoarding = null;
    this.committeeCategoryDropdownBoarding = null;
  }

  openConfirm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openConfirmGrid(cross: CrossBoardPosition, template: TemplateRef<any>) {
    this.crossBoardPositionDelete = cross;
    this.modalRef = this.modalService.show(template);
  }

  closeModalConfirm() {
    if (!this.modalRef) {
      return;
    }
    this.modalRef.hide();
  }

  cancelDelete() {
    if (!this.modalRef) {
      return;
    }
    this.isAdding = !this.isAdding;
    this.crossBoardPositionAdd = new CrossBoardPosition();
    this.modalRef.hide();
  }

  deleteCross() {
    if (this.crossBoardPositionDelete && this.crossBoardPositionDelete.id) {
      this.clientExecutive.crossBoardPosition =
              this.clientExecutive.crossBoardPosition.filter(x => x.id !== this.crossBoardPositionDelete.id);
    }
    this.modalRef.hide();
  }

  assignEmptyGuid() {
    this.listAddCrossBoard.forEach(cross => {
      this.clientExecutive.crossBoardPosition.forEach(item => {
        if (item.id === cross) {
          item.id = '00000000-0000-0000-0000-000000000000';
        }
      });
    });
  }

  jsonCommite(commite: CommitteeCategory): string {
    const arrayCommite: CommitteeCategory[] = [];
    arrayCommite.push(commite);
    return JSON.stringify(arrayCommite);
  }

  commiteJson(commiteJson: string): CommitteeCategory {
    if (commiteJson && commiteJson !== '') {
      const arrayCommite: CommitteeCategory[] = JSON.parse(commiteJson);
      if (arrayCommite && arrayCommite.length > 0) {
        return arrayCommite[0];
      } else {
        return new CommitteeCategory();
      }
    }
  }

  auditFirmSelected(idAuditFirm: string): string {
    if (this.auditFirm && this.auditFirm.length > 0) {
      const audit = this.auditFirm.find(x => x.id === idAuditFirm);
      if (audit) {
        return audit.displayName;
      } else {
        return '';
      }
    }
  }

  commiteSelected(commitedJson: string): string {
    if (this.committeeCategory && this.committeeCategory.length > 0) {
      const commite = this.commiteJson(commitedJson);
      if (commite) {
        const find = this.committeeCategory.find(x => x.id === commite.id);
        if (find) {
          return find.name;
        }
      }
    }
    return '';
  }

  listCommitees(committeesListJSON: string): CommitteesListJSON[] {
    const list: CommitteesListJSON[] = committeesListJSON ? (JSON.parse(committeesListJSON)) : [];
    return list;
  }

  focusoutyrsOnBoard() {
    if (this.crossBoardPositionAdd.yrsOnBoard < 0) {
      this.crossBoardPositionAdd.yrsOnBoard = 0;
    }
  }

  focusoutCurrentRoleTenure() {
    if (this.clientExecutive.currentRoleTenure < 0) {
      this.clientExecutive.currentRoleTenure = 0;
    }
  }
}
