import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionsOrdersComponent } from './productions-orders.component';

describe('ProductionsOrdersComponent', () => {
    let component: ProductionsOrdersComponent;
    let fixture: ComponentFixture<ProductionsOrdersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductionsOrdersComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductionsOrdersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
