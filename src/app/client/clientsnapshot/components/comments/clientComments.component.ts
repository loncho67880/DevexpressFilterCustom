import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ClientComments } from './models/ClientComments';
import * as fromStore from './store/clientcomments.reducer';
import * as fromActions from './store/clientcomments.actions';
import * as fromSelector from './store/clientcomments.selectors';
import { ActivatedRoute } from '@angular/router';
import { ClientCommentsService } from './services/ClientComments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './clientComments.component.html',
  styleUrls: ['./clientComments.component.css']
})
export class CommentsComponent {
  modalRef: BsModalRef;
  clientComments$: Observable<ClientComments[]>;
  responseCreate$: Observable<ClientComments>;
  responseUpdate$: Observable<ClientComments>;
  responseDelete$: Observable<ClientComments>;
  loading$: Observable<boolean>;
  comment = '';
  id: string;
  isCreated = true;
  commentselected: ClientComments;
  start = 0;
  end: number = this.clientCommentsService.quantityPerPage + this.start;
  throttle = 50;
  scrollDistance = 2;
  listPagLoaded: number[] = [];

  constructor(private route: ActivatedRoute, private store: Store<fromStore.ClientCommentsState>
    , private modalService: BsModalService, private clientCommentsService: ClientCommentsService) {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.store.dispatch(fromActions.cleanClientCommentsInfo({ clientComments: [] }));
      this.clientComments$ = this.store.select(fromSelector.ClientCommentsInfo);
      this.loading$ = this.store.select(fromSelector.isLoading);
      this.onScroll();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    if (this.isCreated) {
      this.comment = '';
    }
  }

  openConfirm(commentsel: ClientComments, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.asignValues(commentsel);
  }

  closeModal() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
  }

  save() {
    if (!this.modalRef) {
      return;
    }
    if (this.isCreated) {
      // Create object
      const objcomment: ClientComments = new ClientComments('00000000-0000-0000-0000-000000000000',
                                                            this.id,
                                                            this.comment,
                                                            'SYSTEM',
                                                            new Date(),
                                                            false);

      // Send create comment
      this.store.dispatch(fromActions.requestCreateClientCommentsInfo({ client: objcomment }));
      this.responseCreate$ = this.store.select(fromSelector.responseCreate);
    } else {
      // Update object
      this.commentselected.value = this.comment;

      // Send create comment
      this.store.dispatch(fromActions.requestUpdateClientCommentsInfo({ client: this.commentselected }));
      this.responseUpdate$ = this.store.select(fromSelector.responseUpdate);
    }
    this.isCreated = true;
    this.closeModal();
  }

  update(commentselected: ClientComments, template) {
    this.asignValues(commentselected);
    this.comment = this.commentselected.value;
    this.isCreated = false;
    this.openModal(template);
  }

  delete() {
    this.store.dispatch(fromActions.requesDeleteClientCommentsInfo({ client: this.commentselected }));
    this.responseDelete$ = this.store.select(fromSelector.responseDelete);
    this.closeModal();
  }

  asignValues(commentselected: ClientComments) {
    this.commentselected = { ...commentselected };
  }

  onScroll() {
    if (!this.pageLoaded()) {
      this.store.dispatch(fromActions.requestLoadClientCommentsInfo({ id: this.id, page: this.start }));
      this.updateIndex();
    }
  }

  updateIndex() {
    this.listPagLoaded.push(this.start);
    this.start = this.end;
    this.end = this.clientCommentsService.quantityPerPage + this.start;
  }

  pageLoaded(): boolean {
    return !!(this.listPagLoaded.find(page => page === this.start));
  }
}
