import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientSnapshotComponent } from './clientSnapshot.component';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

describe('Header Component', () => {
  let component: ClientSnapshotComponent;
  let fixture: ComponentFixture<ClientSnapshotComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), TranslateModule.forRoot()],
      declarations: [ClientSnapshotComponent]
    });
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSnapshotComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
