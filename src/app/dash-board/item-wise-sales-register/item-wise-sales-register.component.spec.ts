import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseSalesRegisterComponent } from './item-wise-sales-register.component';

describe('ItemWiseSalesRegisterComponent', () => {
    let component: ItemWiseSalesRegisterComponent;
    let fixture: ComponentFixture<ItemWiseSalesRegisterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemWiseSalesRegisterComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemWiseSalesRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
