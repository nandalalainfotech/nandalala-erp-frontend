import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemwisePurchaseComponent } from './itemwise-purchase.component';

describe('ItemwisePurchaseComponent', () => {
    let component: ItemwisePurchaseComponent;
    let fixture: ComponentFixture<ItemwisePurchaseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemwisePurchaseComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemwisePurchaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
