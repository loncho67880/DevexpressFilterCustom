import { ContactUs } from './models/contactus';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromActions from './store/contactus.actions';
import * as fromStore from './store/contactus.reducer';
import * as fromSelector from './store/contactus.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ContentListItem } from './models/contentListItem';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent {
  contactusInfo$: Observable<ContactUs>;
  contentQuestionList$: Observable<ContentListItem[]>;
  technicalList$: Observable<ContentListItem[]>;
  defendLeadershipList$: Observable<ContentListItem[]>;
  regionalDefendList$: Observable<ContentListItem[]>;
  constructor(
    private store: Store<fromStore.ContactusState>,
    private translateService: TranslateService
  ) {
    this.store.dispatch(fromActions.requestLoadcontactusInfo());
    this.contactusInfo$ = this.store.select(fromSelector.contactusInfo);
    this.contentQuestionList$ = this.translateService
      .get('contactus.contentQuestionList')
      .pipe(
        map((s) => {
          const list = JSON.parse(s) as ContentListItem[];
          return list;
        })
      );

    this.technicalList$ = this.translateService
      .get('contactus.technicalList')
      .pipe(
        map((s) => {
          const list = JSON.parse(s) as ContentListItem[];
          return list;
        })
      );
    this.defendLeadershipList$ = this.translateService
      .get('contactus.defendLeadershipList')
      .pipe(
        map((s) => {
          const list = JSON.parse(s) as ContentListItem[];
          return list;
        })
      );
    this.regionalDefendList$ = this.translateService
      .get('contactus.regionalDefendList')
      .pipe(
        map((s) => {
          const list = JSON.parse(s) as ContentListItem[];
          return list;
        })
      );
  }
}
