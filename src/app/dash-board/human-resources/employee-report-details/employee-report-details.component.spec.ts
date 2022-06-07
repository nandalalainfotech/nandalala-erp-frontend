import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReportDetailsComponent } from './employee-report-details.component';

describe('EmployeeReportDetailsComponent', () => {
    let component: EmployeeReportDetailsComponent;
    let fixture: ComponentFixture<EmployeeReportDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeeReportDetailsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeReportDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});