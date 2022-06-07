import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCostComponent } from './active-cost.component';

describe('ActiveCostComponent', () => {
  let component: ActiveCostComponent;
  let fixture: ComponentFixture<ActiveCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
