import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HomeEffects } from './home.effect';
import { HttpClientModule } from '@angular/common/http';

describe('Home effects', () => {
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: HomeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeEffects,
        provideMockActions(() => actions$)
      ],
      imports: [HttpClientModule]
    });

    effects = TestBed.inject(HomeEffects);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });
});
