import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { RevenueEffects } from './revenue.effect';
import { HttpClientModule } from '@angular/common/http';

describe('revenue effects', () => {
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: RevenueEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RevenueEffects,
        provideMockActions(() => actions$)
      ],
      imports: [HttpClientModule]
    });

    effects = TestBed.inject(RevenueEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
