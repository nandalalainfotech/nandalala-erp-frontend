import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPriceDetailsComponent } from './item-price-details.component';

describe('ItemPriceDetailsComponent', () => {
    let component: ItemPriceDetailsComponent;
    let fixture: ComponentFixture<ItemPriceDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemPriceDetailsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemPriceDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
