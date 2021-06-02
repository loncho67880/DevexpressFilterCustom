import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromStore from './store/clientIssues.reducer';
import * as fromActions from './store/clientIssues.actions';
import * as fromSelector from './store/clientIssues.selectors';
import { Observable } from 'rxjs';
import { ClientIssues } from './models/clientIssues';
import { Action } from './models/action';
import { Severity } from './models/severity';
import { Issue } from './models/issue';

@Component({
  selector: 'app-issues',
  templateUrl: './clientIssues.component.html',
  styleUrls: ['./clientIssues.component.css']
})
export class IssuesComponent {
  modalRef: BsModalRef;
  id: string;
  clientIssues$: Observable<ClientIssues[]>;
  responseCreate$: Observable<ClientIssues>;
  responseUpdate$: Observable<ClientIssues>;
  responseDelete$: Observable<ClientIssues>;
  clientActions$: Observable<Action[]>;
  clientSeveritys$: Observable<Severity[]>;
  clientIssuesList$: Observable<Issue[]>;
  listActions: Action[];
  listSeveritys: Severity[];
  listIssuesList: Issue[];
  loading$: Observable<boolean>;
  isCreated: boolean;
  issueSelected: ClientIssues;
  issueDropdown: Issue;
  priorityIssueDropdown: Severity;
  actionDropdown: Action;
  priorityActionDropdown: Severity;
  canAddIssues = true;

  constructor(private route: ActivatedRoute, private store: Store<fromStore.ClientIssuesState>
    , private modalService: BsModalService) {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.store.dispatch(fromActions.requestLoadClientIssuesInfo({ id: this.id }));
      this.clientIssues$ = this.store.select(fromSelector.ClientIssuesInfo);
      this.store.dispatch(fromActions.requestLoadActionInfo());
      this.clientActions$ = this.store.select(fromSelector.ActionInfo);
      this.clientActions$.subscribe(data => {
        if (data) {
          this.listActions = data;
        }
      });
      this.store.dispatch(fromActions.requestLoadSeverityInfo());
      this.clientSeveritys$ = this.store.select(fromSelector.SeverityInfo);
      this.clientSeveritys$.subscribe(data => {
        if (data) {
          this.listSeveritys = data;
        }
      });
      this.store.dispatch(fromActions.requestLoadIssueInfo());
      this.clientIssuesList$ = this.store.select(fromSelector.IssueInfo);
      this.clientIssuesList$.subscribe(data => {
        if (data) {
          this.listIssuesList = data;
        }
      });
      this.clientIssues$.subscribe(data => {
        if (data) {
          const list: ClientIssues[] = data;
          if (list.length === 5) {
            this.canAddIssues = false;
          } else {
            this.canAddIssues = true;
          }
        }
      });
      this.loading$ = this.store.select(fromSelector.isLoading);
      this.isCreated = true;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'modal-lg' }));
    if (this.isCreated) {
      this.issueSelected = ClientIssues.create();
    }
  }

  openConfirm(issuesel: ClientIssues, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.asignValues(issuesel);
  }

  closeModal() {
    if (this.modalRef) { this.cleanDropdown(); this.modalRef.hide(); }
  }

  save() {
    if (!this.modalRef) {
      return;
    }
    if (this.isCreated) {
      this.issueSelected = new ClientIssues('00000000-0000-0000-0000-000000000000',
                                            this.id,
                                            this.issueSelected.issueId,
                                            this.issueSelected.severityId,
                                            this.issueSelected.actionId,
                                            this.issueSelected.additionalDetails,
                                            this.issueSelected.actionSeverityId,
                                            this.issueSelected.actionAdditionalDetails,
                                            'SYSTEM',
                                            new Date());
      // Send create issue
      this.store.dispatch(fromActions.requestCreateClientIssuesInfo({client: this.issueSelected}));
      this.responseCreate$ = this.store.select(fromSelector.responseCreate);
    } else {
      // Send create issue
      this.store.dispatch(fromActions.requestUpdateClientIssuesInfo({client: this.issueSelected}));
      this.responseUpdate$ = this.store.select(fromSelector.responseUpdate);
    }
    this.isCreated = true;
    this.cleanDropdown();
    this.closeModal();
  }

  update(issueSelected: ClientIssues, template) {
    this.asignValues(issueSelected);
    this.isCreated = false;
    this.openModal(template);
  }

  delete() {
    this.store.dispatch(fromActions.requesDeleteClientIssuesInfo({client: this.issueSelected}));
    this.responseDelete$ = this.store.select(fromSelector.responseDelete);
    this.closeModal();
  }

  asignValues(issueSelected: ClientIssues) {
    this.issueSelected = {...issueSelected};
    this.issueDropdown = this.getIssue(this.issueSelected.issueId);
    this.priorityIssueDropdown = this.getSeverity(this.issueSelected.severityId);
    this.actionDropdown = this.getAction(this.issueSelected.actionId);
    this.priorityActionDropdown = this.getSeverity(this.issueSelected.actionSeverityId);
  }

  selectIssue(issue: Issue) {
    this.issueSelected.issueId = issue.id;
    this.issueDropdown = issue;
  }

  selectPriorityIssue(priority: Severity) {
    this.issueSelected.severityId = priority.id;
    this.priorityIssueDropdown = priority;
  }

  selectAction(action: Action) {
    this.issueSelected.actionId = action.id;
    this.actionDropdown = action;
  }

  selectPriorityAction(priority: Severity) {
    this.issueSelected.actionSeverityId = priority.id;
    this.priorityActionDropdown = priority;
  }

  cleanDropdown() {
    this.issueDropdown = null;
    this.priorityIssueDropdown = null;
    this.actionDropdown = null;
    this.priorityActionDropdown = null;
  }

  getAction(id: string): Action {
    if (this.listActions.find(x => x.id === id)) {
      return this.listActions.find(x => x.id === id);
    } else {
      return new Action('');
    }
  }

  getSeverity(id: string): Severity {
    if (this.listSeveritys.find(x => x.id === id)) {
      return this.listSeveritys.find(x => x.id === id);
    } else {
      return new Severity('');
    }
  }

  getIssue(id: string): Issue {
    if (this.listIssuesList.find(x => x.id === id)) {
      return this.listIssuesList.find(x => x.id === id);
    } else {
      return new Issue('');
    }
  }
}
