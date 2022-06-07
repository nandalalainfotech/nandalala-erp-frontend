import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodclosingVoucherComponent } from './periodclosing-voucher.component';

describe('PeriodclosingVoucherComponent', () => {
    let component: PeriodclosingVoucherComponent;
    let fixture: ComponentFixture<PeriodclosingVoucherComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PeriodclosingVoucherComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PeriodclosingVoucherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
