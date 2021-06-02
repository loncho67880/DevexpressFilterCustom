import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ProfileEffects } from './profile.effect';
import { HttpClientModule } from '@angular/common/http';

describe('Profile effects', () => {
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: ProfileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileEffects,
        provideMockActions(() => actions$)
      ],
      imports: [HttpClientModule]
    });

    effects = TestBed.inject(ProfileEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
