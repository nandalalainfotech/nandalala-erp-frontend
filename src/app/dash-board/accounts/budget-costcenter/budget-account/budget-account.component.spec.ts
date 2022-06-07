import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAccountComponent } from './budget-account.component';

describe('BudgetAccountComponent', () => {
    let component: BudgetAccountComponent;
    let fixture: ComponentFixture<BudgetAccountComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BudgetAccountComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BudgetAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
