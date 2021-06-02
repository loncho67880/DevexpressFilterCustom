import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ClientCommentsEffects } from './ClientComments.effect';
import { HttpClientModule } from '@angular/common/http';

describe('ClientComments effects', () => {
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: ClientCommentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientCommentsEffects,
        provideMockActions(() => actions$)
      ],
      imports: [HttpClientModule]
    });

    effects = TestBed.inject(ClientCommentsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
