import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingSupplierComponent } from './buying-supplier.component';

describe('BuyingSupplierComponent', () => {
    let component: BuyingSupplierComponent;
    let fixture: ComponentFixture<BuyingSupplierComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BuyingSupplierComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BuyingSupplierComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
