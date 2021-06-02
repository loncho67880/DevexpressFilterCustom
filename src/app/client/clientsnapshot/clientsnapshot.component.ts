import { Component, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromActions from './store/clientSnapshot.actions';
import * as fromStore from './store/clientSnapshot.reducer';
import * as fromSelector from './store/clientSnapshot.selectors';
import { ActivatedRoute } from '@angular/router';
import { MatListOption } from '@angular/material/list';
import * as fromSelectorIssue from '../clientsnapshot/components/issues/store/clientIssues.selectors';
import { ClientSnapshot } from './models/clientSnapshot';
import { CriticalPhase } from './models/criticalPhase';
import { CriticalPhaseStatus } from './models/criticalPhaseStatus';
import { VulnerabilityRating } from './models/vulnerabilityRating';
import { ClientRetentionDetails } from './models/clientRetentionDetails';
import { RetentionDetailsOutcome } from './models/RetentionDetailsOutcome';
import { ReasonsRFP } from './models/ReasonsRFP';
import { ReasonsRetentionLoss } from './models/ReasonsRetentionLoss';
import { Priority } from './models/priorty';
import { ClientVulnerabilityRating } from './models/ClientVulnerabilityRating';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-clientsnapshot',
  templateUrl: './ClientSnapshot.component.html',
  styleUrls: ['./ClientSnapshot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSnapshotComponent {

  modalRef: BsModalRef;
  ClientSnapshotInfo$: Observable<ClientSnapshot>;
  userLastupdate$: Observable<string>;
  isCollapsedIssue = true;
  isCollapsedComments = true;
  id: string;
  relationShip$: Observable<VulnerabilityRating[]>;
  relationShip: Observable<VulnerabilityRating[]>;
  relationShipDroDown: VulnerabilityRating;
  criticalPhase$: Observable<CriticalPhase[]>;
  criticalPhaseDroDown: CriticalPhase;
  activeRFP$: Observable<CriticalPhaseStatus[]>;
  activeRFPDroDown: CriticalPhaseStatus;
  retentionOutcome$: Observable<RetentionDetailsOutcome[]>;
  retentionOutcome: RetentionDetailsOutcome[];
  retentionOutcomeDropDown: RetentionDetailsOutcome;
  outcomeList: RetentionDetailsOutcome[];
  reasonsRetentionLoss$: Observable<ReasonsRetentionLoss[]>;
  reasonsRetentionLoss: ReasonsRetentionLoss[];
  reasonsRetentionLossSelected: ReasonsRetentionLoss[] = [];
  RFPReason$: Observable<ReasonsRFP[]>;
  RFPReason: ReasonsRFP[];
  priority$: Observable<Priority[]>;
  priority: Priority[];
  RFPReasonSelected: ReasonsRFP[] = [];
  priorityDropDown: Priority;
  RFPpriorityDropDown: Priority;
  isCollapsed: boolean;
  clientRetentionDetailsList$: Observable<ClientRetentionDetails[]>;
  clientRetentionDetailsList: ClientRetentionDetails[];
  clientRetentionDetailsLast: ClientRetentionDetails;
  clientRetentionDetails: ClientRetentionDetails = this.newClientRetention();
  clientVulnerabilityRating$: Observable<ClientVulnerabilityRating>;
  clientVulnerabilityRating: ClientVulnerabilityRating;
  loading$: Observable<boolean>;
  date = new FormControl(new Date());
  startDate = new Date(2000, 0, 2);

  constructor(private modalService: BsModalService,
    private store: Store<fromStore.ClientSnapshotState>
    , private route: ActivatedRoute) {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.clientVulnerabilityRating = undefined;
      this.loading$ = this.store.select(fromSelector.isLoading);
      this.store.dispatch(fromActions.requestLoadClientSnapshotInfo({ id: this.id }));
      this.ClientSnapshotInfo$ = this.store.select(fromSelector.ClientSnapshotInfo);
      this.userLastupdate$ = this.store.select(fromSelectorIssue.userLastupdate);
      this.store.dispatch(fromActions.requestLoadRetentionDetailsOutcome());
      this.retentionOutcome$ = this.store.select(fromSelector.retentionOutcomeInfo);
      this.retentionOutcome$.subscribe(outcomes => {
        if (outcomes) {
          this.retentionOutcome = outcomes;
        }
      });
      this.store.dispatch(fromActions.requestLoadReasonsRFP());
      this.RFPReason$ = this.store.select(fromSelector.retentionReasonInfo);
      this.RFPReason$.subscribe(reason => {
        this.RFPReason = reason as ReasonsRFP[];
      });
      this.store.dispatch(fromActions.requestReasonsRetentionLoss());
      this.reasonsRetentionLoss$ = this.store.select(fromSelector.ReasonsRetentionLossListInfo);

      this.store.dispatch(fromActions.requestPriority());
      this.priority$ = this.store.select(fromSelector.priorityInfo);
      this.priority$.subscribe(prio => {
        this.priority = prio;
      });
      this.store.dispatch(fromActions.requestLoadClientRetentionDetails({ id: this.id }));
      this.clientRetentionDetailsList$ = this.store.select(fromSelector.clientRetentionDetailsInfo);
      this.clientRetentionDetailsList$.subscribe(data => {
        this.clientRetentionDetailsList = data;
        this.clientRetentionDetailsLast = this.clientRetentionDetailsList[0];
      });
      this.store.select(fromSelector.retentionOutcomeInfo).subscribe(info => this.outcomeList = info);
      this.reasonsRetentionLoss$.subscribe(retentionLoss => {
        if (retentionLoss) {
          this.reasonsRetentionLoss = retentionLoss as ReasonsRetentionLoss[];
        }
      });
      this.store.dispatch(fromActions.requestLoadClientVulnerabilityRating({ id: this.id }));
      this.store.dispatch(fromActions.requestLoadRelationshipVulnerability());
      this.relationShip$ = this.store.select(fromSelector.relationshipVulnerabilityInfo);
      this.store.dispatch(fromActions.requestLoadCriticalPhase());
      this.criticalPhase$ = this.store.select(fromSelector.criticalPhaseInfo);
      this.store.dispatch(fromActions.requestLoadActiveRfp());
      this.activeRFP$ = this.store.select(fromSelector.activeRfpInfo);
      this.clientVulnerabilityRating$ = this.store.select(fromSelector.clientVulnerabilityRatingInfo);
      this.clientVulnerabilityRating$.subscribe(clientVulnerability => {
        if (clientVulnerability) {
          this.clientVulnerabilityRating = clientVulnerability;

          this.relationShip$.subscribe(data => {
            if (data && this.clientVulnerabilityRating && this.clientVulnerabilityRating.ratingId) {
              data.forEach(relation => {
                if (this.clientVulnerabilityRating.ratingId === relation.id) {
                  this.relationShipDroDown = relation;
                }
              });
            }
          });

          this.criticalPhase$.subscribe(data => {
            if (data && this.clientVulnerabilityRating && this.clientVulnerabilityRating.criticalPhaseId) {
              data.forEach(critical => {
                if (this.clientVulnerabilityRating.criticalPhaseId === critical.id) {
                  this.criticalPhaseDroDown = critical;
                }
              });
            }
          });

          this.activeRFP$.subscribe(data => {
            if (data && this.clientVulnerabilityRating && this.clientVulnerabilityRating.criticalPhaseStatusId) {
              data.forEach(activeRFP => {
                if (this.clientVulnerabilityRating.criticalPhaseStatusId === activeRFP.id) {
                  this.activeRFPDroDown = activeRFP;
                }
              });
            }
          });
        }
      });
    });
  }

  selectrelationShip(relation, template: TemplateRef<any>) {
    this.relationShipDroDown = relation;
    if (this.relationShipDroDown.value.includes('LOST')) {
      this.openModal(template);
    }
    if (!this.isCritical()) {
      this.criticalPhaseDroDown = null;
      this.activeRFPDroDown = null;
    }
  }

  selectcriticalPhase(critical) {
    this.criticalPhaseDroDown = critical;
  }

  selectactiveRFP(active) {
    this.activeRFPDroDown = active;
  }

  selectRetentionOutcome(outcome) {
    this.retentionOutcomeDropDown = outcome;
  }

  selectRetentionReason(reason: MatListOption[]) {
    this.reasonsRetentionLossSelected = [];
    reason.forEach(item => {
      const reasonsRetentionLoss = new ReasonsRetentionLoss();
      reasonsRetentionLoss.reasonId = item.value;
      this.reasonsRetentionLossSelected.push(reasonsRetentionLoss);
    });
  }

  selectRFPReason(reason: MatListOption[]) {
    this.RFPReasonSelected = [];
    reason.forEach(item => {
      const reasonItem = new ReasonsRFP();
      reasonItem.reasonId = item.value;
      this.RFPReasonSelected.push(reasonItem);
    });
  }

  selectRFPPriority(priority: Priority) {
    this.RFPpriorityDropDown = priority;
  }

  selectPriority(priority: Priority) {
    this.priorityDropDown = priority;
  }

  deleteRetention(retention: ClientRetentionDetails) {
    this.store.dispatch(fromActions.requestDeleteClientRetentionDetails({ id: retention.id }));
    this.closeModal();
  }
  openConfirm(retention, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.asignValues(retention);
  }
  openModal(template: TemplateRef<any>) {
    this.cleanModal();
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-lg' }));
  }

  closeModal() {
    if (!this.modalRef) {
      return;
    }
    this.modalRef.hide();
  }

  saveRetention() {
    if (this.clientRetentionDetails && this.clientRetentionDetails.id === '') {
      this.assignPriority();
      this.clientRetentionDetails = new ClientRetentionDetails('00000000-0000-0000-0000-000000000000',
                                                                this.id, this.retentionOutcomeDropDown.id,
                                                                this.clientRetentionDetails.date,
                                                                this.reasonsRetentionLossSelected,
                                                                this.RFPReasonSelected, 'SYSTEM',
                                                                new Date());
      this.store.dispatch(fromActions.requestCreateClientRetentionDetails({ clientRetentionDetails: this.clientRetentionDetails }));
      this.closeModal();
    } else {
      if (this.reasonsRetentionLossSelected.length === 0) {
        this.reasonsRetentionLossSelected = this.clientRetentionDetails.reasonsRetentionLoss;
      }
      if (this.RFPReasonSelected.length === 0) {
        this.RFPReasonSelected = this.clientRetentionDetails.reasonsRFP;
      }
      // Asign priority to reasons
      this.assignPriority();
      this.clientRetentionDetails = new ClientRetentionDetails(this.clientRetentionDetails.id, this.id, this.retentionOutcomeDropDown.id
        , this.clientRetentionDetails.date, this.reasonsRetentionLossSelected, this.RFPReasonSelected, 'SYSTEM', new Date());
      this.store.dispatch(fromActions.requestEditClientRetentionDetails({ clientRetentionDetails: this.clientRetentionDetails }));
      this.closeModal();
      this.cleanModal();
    }
  }

  assignPriority() {
    // Asign priority to reasons
    const reasonsRetentionLossSelectedTemp: ReasonsRetentionLoss[] = [];
    this.reasonsRetentionLossSelected.forEach(item => {
      const reason: ReasonsRetentionLoss = { ...item };
      reason.priorityId = this.priorityDropDown.id;
      reasonsRetentionLossSelectedTemp.push(reason);
    });
    this.reasonsRetentionLossSelected = reasonsRetentionLossSelectedTemp;
    const RFPReasonSelectedTemp: ReasonsRFP[] = [];
    this.RFPReasonSelected.forEach(item => {
      const reason: ReasonsRetentionLoss = { ...item };
      reason.priorityId = this.RFPpriorityDropDown.id;
      RFPReasonSelectedTemp.push(reason);
    });
    this.RFPReasonSelected = RFPReasonSelectedTemp;
  }

  getOutcomeName(id: string) {
    if (this.outcomeList) {
      const value = this.outcomeList.find(i => i.id === id);
      return value?.value;
    } else {
      return '';
    }
  }

  getRetentionDetailsReason(id: string) {
    const data: any = [...this.reasonsRetentionLoss];
    if (data) {
      const reason: any[] = data.filter(i => i.id === id).map(response => response.value);
      return reason;
    } else {
      return '';
    }
  }
  getRetentionPriority(id: string) {
    if (this.priority) {
      const value = this.priority.find(i => i.id === id);
      return value?.value;
    } else {
      return '';
    }
  }

  getRetentionRFP(id: string) {
    const data: any = [...this.RFPReason];
    if (data) {
      const reason: any[] = data.filter(i => i.id === id).map(response => response.value);
      return reason;
    } else {
      return '';
    }
  }
  getRFPPriority(id: string) {
    if (this.priority) {
      const list = [...this.priority];
      const value = list.find(i => i.id === id);
      return value?.value;
    } else {
      return '';
    }
  }
  openEdit(clientRetention: ClientRetentionDetails, template: TemplateRef<any>) {
    this.asignValues(clientRetention);
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-lg' }));
  }

  asignValues(clientSelected: ClientRetentionDetails) {
    this.clientRetentionDetails = { ...clientSelected };
    // Asign outcome
    const outcome = this.retentionOutcome.find(x => clientSelected.outcomeId === x.id);
    if (outcome) {
      this.retentionOutcomeDropDown = outcome;
    }
    this.assignReasonLoss();
    this.assignReasonRFP();
  }

  assignReasonLoss() {
    const reasonsRetentionLossTemp: ReasonsRetentionLoss[] = [];
    this.reasonsRetentionLoss.forEach(reason => {
      let exist = false;
      this.clientRetentionDetails.reasonsRetentionLoss.forEach(item => {
        if (item.reasonId === reason.id) {
          const reasonTemp = { ...reason };
          reasonTemp.selected = true;
          exist = true;
          reasonsRetentionLossTemp.push(reasonTemp);
          // asign priority
          const priority = this.priority.find(x => item.priorityId === x.id);
          if (priority) {
            this.priorityDropDown = priority;
          }
        }
      });
      if (!exist) {
        const reasonTemp = { ...reason };
        reasonTemp.selected = false;
        reasonsRetentionLossTemp.push(reasonTemp);
      }
    });
    this.reasonsRetentionLoss = reasonsRetentionLossTemp;
  }

  assignReasonRFP() {
    const reasonsRFPTemp: ReasonsRFP[] = [];
    this.RFPReason.forEach(reason => {
      let exist = false;
      this.clientRetentionDetails.reasonsRFP.forEach(item => {
        if (item.reasonId === reason.id) {
          const reasonTemp = { ...reason };
          reasonTemp.selected = true;
          exist = true;
          reasonsRFPTemp.push(reasonTemp);
          // asign priority
          const priority = this.priority.find(x => item.priorityId === x.id);
          if (priority) {
            this.RFPpriorityDropDown = priority;
          }
        }
      });
      if (!exist) {
        const reasonTemp = { ...reason };
        reasonTemp.selected = false;
        reasonsRFPTemp.push(reasonTemp);
      }
    });
    this.RFPReason = reasonsRFPTemp;
  }

  cleanModal() {
    this.clientRetentionDetails = this.newClientRetention();
    this.priorityDropDown = null;
    this.RFPpriorityDropDown = null;
    this.retentionOutcomeDropDown = null;
    const reasonsRetentionLossTemp: ReasonsRetentionLoss[] = [];
    this.reasonsRetentionLoss.forEach(item => {
      const reason = { ...item };
      reason.selected = false;
      reasonsRetentionLossTemp.push(reason);
    });
    this.reasonsRetentionLoss = reasonsRetentionLossTemp;
    const RFPReasonTemp: ReasonsRFP[] = [];
    this.RFPReason.forEach(item => {
      const reason = { ...item };
      reason.selected = false;
      RFPReasonTemp.push(reason);
    });
    this.RFPReason = RFPReasonTemp;
  }

  newClientRetention(): ClientRetentionDetails {
    return new ClientRetentionDetails('', '', '', new Date(), [], [], '', new Date());
  }

  saveVulnerabilityRating() {
    if (this.clientVulnerabilityRating && this.clientVulnerabilityRating.id !== '') {
      this.assingValuesVulnerability();
      this.store.dispatch(fromActions.requestEditClientVulnerabilityRating({ clientVulnerabilityRating: this.clientVulnerabilityRating }));
    } else if (!this.clientVulnerabilityRating) {
      this.assingValuesVulnerability();
      this.store.dispatch(
                 fromActions.requestCreateClientVulnerabilityRating({ clientVulnerabilityRating: this.clientVulnerabilityRating }));
    }
  }
  cancelVulnerabilityRating() {
    this.relationShipDroDown = null;
    this.criticalPhaseDroDown = null;
    this.activeRFPDroDown = null;
  }
  assingValuesVulnerability() {
    if (this.relationShipDroDown) {
      if (!this.clientVulnerabilityRating) {
        this.clientVulnerabilityRating = new ClientVulnerabilityRating('00000000-0000-0000-0000-000000000000',
                                                                        this.id, this.relationShipDroDown.id,
                                                                        null,
                                                                        null,
                                                                        'SYSTEM',
                                                                        new Date());
      } else {
        this.clientVulnerabilityRating = new ClientVulnerabilityRating(this.clientVulnerabilityRating.id,
                                                                       this.id,
                                                                       this.relationShipDroDown.id,
                                                                       null,
                                                                       null,
                                                                       'SYSTEM',
                                                                       new Date());
      }
      if (this.criticalPhaseDroDown) {
        this.clientVulnerabilityRating.criticalPhaseId = this.criticalPhaseDroDown.id;
        if (this.activeRFPDroDown) {
          this.clientVulnerabilityRating.criticalPhaseStatusId = this.activeRFPDroDown.id;
        }
      }
    }
  }

  isCritical(): boolean {
    return this.relationShipDroDown?.value === 'Critical';
  }

  isCriticalRFP(): boolean {
    return this.criticalPhaseDroDown?.value.includes('Active');
  }
}
