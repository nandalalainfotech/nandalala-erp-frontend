import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingRuleComponent } from './shipping-rule.component';

describe('ShippingRuleComponent', () => {
    let component: ShippingRuleComponent;
    let fixture: ComponentFixture<ShippingRuleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShippingRuleComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShippingRuleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
