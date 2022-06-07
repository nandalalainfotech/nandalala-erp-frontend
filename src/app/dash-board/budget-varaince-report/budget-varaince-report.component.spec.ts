import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetVarainceReportComponent } from './budget-varaince-report.component';

describe('BudgetVarainceReportComponent', () => {
  let component: BudgetVarainceReportComponent;
  let fixture: ComponentFixture<BudgetVarainceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetVarainceReportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetVarainceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
