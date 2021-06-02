import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaminformationComponent } from './teaminformation.component';

describe('TeaminformationComponent', () => {
  let component: TeaminformationComponent;
  let fixture: ComponentFixture<TeaminformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeaminformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaminformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
