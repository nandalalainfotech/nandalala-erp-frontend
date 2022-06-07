import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetVariancerepComponent } from './budget-variancerep.component';

describe('BudgetVariancerepComponent', () => {
    let component: BudgetVariancerepComponent;
    let fixture: ComponentFixture<BudgetVariancerepComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BudgetVariancerepComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BudgetVariancerepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
