import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientComponent } from './client.component';
import { Store, StoreModule } from '@ngrx/store';

describe('./client/client.module Component', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [ClientComponent]
    });
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
