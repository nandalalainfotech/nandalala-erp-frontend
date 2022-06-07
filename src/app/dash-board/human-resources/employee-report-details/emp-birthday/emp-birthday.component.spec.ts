import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBirthdayComponent } from './emp-birthday.component';

describe('EmpBirthdayComponent', () => {
    let component: EmpBirthdayComponent;
    let fixture: ComponentFixture<EmpBirthdayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmpBirthdayComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmpBirthdayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});