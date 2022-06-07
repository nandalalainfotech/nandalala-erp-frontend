import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleRegisterComponent } from './sale-register.component';

describe('SaleRegisterComponent', () => {
    let component: SaleRegisterComponent;
    let fixture: ComponentFixture<SaleRegisterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SaleRegisterComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SaleRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
