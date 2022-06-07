import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemwisepurchaseComponent } from './itemwisepurchase.component';

describe('ItemwisepurchaseComponent', () => {
    let component: ItemwisepurchaseComponent;
    let fixture: ComponentFixture<ItemwisepurchaseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemwisepurchaseComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemwisepurchaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
