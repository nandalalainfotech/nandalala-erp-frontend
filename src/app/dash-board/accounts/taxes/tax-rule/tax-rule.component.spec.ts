import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRuleComponent } from './tax-rule.component';

describe('TaxRuleComponent', () => {
    let component: TaxRuleComponent;
    let fixture: ComponentFixture<TaxRuleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaxRuleComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaxRuleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
