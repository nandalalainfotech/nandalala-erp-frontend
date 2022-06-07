import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingRuleComponent } from './pricing-rule.component';

describe('PricingRuleComponent', () => {
    let component: PricingRuleComponent;
    let fixture: ComponentFixture<PricingRuleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PricingRuleComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PricingRuleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
