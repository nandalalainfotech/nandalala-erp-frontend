import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTimestComponent } from './product-timest.component';

describe('ProductTimestComponent', () => {
    let component: ProductTimestComponent;
    let fixture: ComponentFixture<ProductTimestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductTimestComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductTimestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
