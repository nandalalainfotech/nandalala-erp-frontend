import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemBilledComponent } from './order-item-billed.component';

describe('OrderItemBilledComponent', () => {
    let component: OrderItemBilledComponent;
    let fixture: ComponentFixture<OrderItemBilledComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrderItemBilledComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderItemBilledComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
