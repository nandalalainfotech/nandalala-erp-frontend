import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingReportDetailsComponent } from './buying-report-details.component';

describe('BuyingReportDetailsComponent', () => {
    let component: BuyingReportDetailsComponent;
    let fixture: ComponentFixture<BuyingReportDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BuyingReportDetailsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BuyingReportDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
