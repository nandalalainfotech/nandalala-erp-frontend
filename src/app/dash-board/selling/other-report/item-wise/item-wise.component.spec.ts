import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseComponent } from './item-wise.component';

describe('ItemWiseComponent', () => {
    let component: ItemWiseComponent;
    let fixture: ComponentFixture<ItemWiseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemWiseComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemWiseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
