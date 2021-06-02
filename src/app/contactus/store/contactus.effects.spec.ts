import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ContactusEffects } from './contactus.effect';
import { HttpClientModule } from '@angular/common/http';

describe('contactus effects', () => {
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: ContactusEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactusEffects, provideMockActions(() => actions$)],
      imports: [HttpClientModule],
    });

    effects = TestBed.inject(ContactusEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
