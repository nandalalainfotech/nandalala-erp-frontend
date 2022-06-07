import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMonthdistComponent } from './budget-monthdist.component';

describe('BudgetMonthdistComponent', () => {
    let component: BudgetMonthdistComponent;
    let fixture: ComponentFixture<BudgetMonthdistComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BudgetMonthdistComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BudgetMonthdistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
