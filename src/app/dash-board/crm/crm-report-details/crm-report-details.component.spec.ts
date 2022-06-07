import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmReportDetailsComponent } from './crm-report-details.component';

describe('CrmReportDetailsComponent', () => {
    let component: CrmReportDetailsComponent;
    let fixture: ComponentFixture<CrmReportDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CrmReportDetailsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CrmReportDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
