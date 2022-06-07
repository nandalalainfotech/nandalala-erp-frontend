import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOrderedComponent } from './item-ordered.component';

describe('ItemOrderedComponent', () => {
    let component: ItemOrderedComponent;
    let fixture: ComponentFixture<ItemOrderedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemOrderedComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemOrderedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
