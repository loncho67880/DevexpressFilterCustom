import { Component, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromActions from './store/notes.actions';
import * as fromStore from './store/notes.reducer';
import * as fromSelector from './store/notes.selectors';
import { Note } from './models/note';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  modalRef: BsModalRef;
  notes$: Observable<Note[]>;
  id: string;
  loading$: Observable<boolean>;
  constructor(private modalService: BsModalService, private store: Store<fromStore.NotesState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.loading$ = this.store.select(fromSelector.isLoading);
      this.store.dispatch(fromActions.requestLoadNotes({ id: this.id }));
      this.notes$ = this.store.select(fromSelector.clientNotesInfo);
    });
  }
  addNote() {
    console.log('add now note');
  }

  editNote() {
    console.log('edit a note');
  }
  closeModal() {
    if (!this.modalRef) {
      return;
    }
    this.modalRef.hide();
  }
  openConfirm(note, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    // this.asignValues(note);
  }
  deleteNote() {
    console.log('delete note');
  }

}
