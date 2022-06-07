import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandCostVoucherComponent } from './land-cost-voucher.component';

describe('LandCostVoucherComponent', () => {
    let component: LandCostVoucherComponent;
    let fixture: ComponentFixture<LandCostVoucherComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LandCostVoucherComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LandCostVoucherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
