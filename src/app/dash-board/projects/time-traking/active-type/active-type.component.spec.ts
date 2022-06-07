import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTypeComponent } from './active-type.component';

describe('ActiveTypeComponent', () => {
  let component: ActiveTypeComponent;
  let fixture: ComponentFixture<ActiveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
