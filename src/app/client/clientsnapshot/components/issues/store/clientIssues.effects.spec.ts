import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ClientIssuesEffects } from './ClientIssues.effect';
import { HttpClientModule } from '@angular/common/http';

describe('ClientIssues effects', () => {
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: ClientIssuesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientIssuesEffects,
        provideMockActions(() => actions$)
      ],
      imports: [HttpClientModule]
    });

    effects = TestBed.inject(ClientIssuesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
