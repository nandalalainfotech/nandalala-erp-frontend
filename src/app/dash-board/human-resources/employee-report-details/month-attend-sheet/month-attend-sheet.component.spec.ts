import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthAttendSheetComponent } from './month-attend-sheet.component';

describe('MonthAttendSheetComponent', () => {
    let component: MonthAttendSheetComponent;
    let fixture: ComponentFixture<MonthAttendSheetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MonthAttendSheetComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MonthAttendSheetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});