import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ClientSnapshotEffects } from './clientSnapshot.effect';
import { HttpClientModule } from '@angular/common/http';

describe('ClientSnapshot effects', () => {
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: ClientSnapshotEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientSnapshotEffects,
        provideMockActions(() => actions$)
      ],
      imports: [HttpClientModule]
    });

    effects = TestBed.inject(ClientSnapshotEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
