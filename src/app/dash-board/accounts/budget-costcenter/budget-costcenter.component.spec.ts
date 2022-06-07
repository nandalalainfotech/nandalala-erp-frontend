import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCostcenterComponent } from './budget-costcenter.component';

describe('BudgetCostcenterComponent', () => {
    let component: BudgetCostcenterComponent;
    let fixture: ComponentFixture<BudgetCostcenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BudgetCostcenterComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BudgetCostcenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
