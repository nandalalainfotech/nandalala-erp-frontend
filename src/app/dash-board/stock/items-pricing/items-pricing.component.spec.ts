import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPricingComponent } from './items-pricing.component';

describe('ItemsPricingComponent', () => {
    let component: ItemsPricingComponent;
    let fixture: ComponentFixture<ItemsPricingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemsPricingComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsPricingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
