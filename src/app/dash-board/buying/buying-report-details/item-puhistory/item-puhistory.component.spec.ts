import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPuhistoryComponent } from './item-puhistory.component';

describe('ItemPuhistoryComponent', () => {
    let component: ItemPuhistoryComponent;
    let fixture: ComponentFixture<ItemPuhistoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemPuhistoryComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemPuhistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
