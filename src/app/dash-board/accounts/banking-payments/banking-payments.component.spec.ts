import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingPaymentsComponent } from './banking-payments.component';

describe('BankingPaymentsComponent', () => {
    let component: BankingPaymentsComponent;
    let fixture: ComponentFixture<BankingPaymentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BankingPaymentsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BankingPaymentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
