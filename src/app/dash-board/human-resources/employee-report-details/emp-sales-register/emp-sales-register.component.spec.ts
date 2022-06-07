import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSalesRegisterComponent } from './emp-sales-register.component';

describe('EmpSalesRegisterComponent', () => {
    let component: EmpSalesRegisterComponent;
    let fixture: ComponentFixture<EmpSalesRegisterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmpSalesRegisterComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmpSalesRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});