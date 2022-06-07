import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpHolidayWorkComponent } from './emp-holiday-work.component';

describe('EmpHolidayWorkComponent', () => {
    let component: EmpHolidayWorkComponent;
    let fixture: ComponentFixture<EmpHolidayWorkComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmpHolidayWorkComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmpHolidayWorkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});