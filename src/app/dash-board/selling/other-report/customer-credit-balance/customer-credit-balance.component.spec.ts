import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreditBalanceComponent } from './customer-credit-balance.component';

describe('CustomerCreditBalanceComponent', () => {
    let component: CustomerCreditBalanceComponent;
    let fixture: ComponentFixture<CustomerCreditBalanceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomerCreditBalanceComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerCreditBalanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
