import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpLeaveBalanceComponent } from './emp-leave-balance.component';

describe('EmpLeaveBalanceComponent', () => {
    let component: EmpLeaveBalanceComponent;
    let fixture: ComponentFixture<EmpLeaveBalanceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmpLeaveBalanceComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmpLeaveBalanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});