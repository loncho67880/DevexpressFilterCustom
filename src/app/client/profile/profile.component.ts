import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActions from './store/profile.actions';
import * as fromStore from './store/profile.reducer';
import * as fromSelector from './store/profile.selectors';
import { Profile } from './models/profile';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  profileInfo$: Observable<Profile>;
  id: string;

  constructor(private route: ActivatedRoute, private store: Store<fromStore.ProfileState>) {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.store.dispatch(fromActions.requestLoadProfileInfo({id: this.id}));
      this.profileInfo$ = this.store.select(fromSelector.profileInfo);
    });
  }
}
