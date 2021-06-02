import { ComponentFixture, TestBed } from '@angular/core/testing';
import { revenueComponent } from './revenue.component';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

describe('Header Component', () => {
  let component: revenueComponent;
  let fixture: ComponentFixture<revenueComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), TranslateModule.forRoot()],
      declarations: [revenueComponent]
    });
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(revenueComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
