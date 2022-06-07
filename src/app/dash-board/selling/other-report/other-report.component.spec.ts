import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherReportComponent } from './other-report.component';

describe('OtherReportComponent', () => {
    let component: OtherReportComponent;
    let fixture: ComponentFixture<OtherReportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OtherReportComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OtherReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
