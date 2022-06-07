import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierQuotComponent } from './supplier-quot.component';

describe('SupplierQuotComponent', () => {
    let component: SupplierQuotComponent;
    let fixture: ComponentFixture<SupplierQuotComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SupplierQuotComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SupplierQuotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
