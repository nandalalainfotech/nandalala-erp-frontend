import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportdetailsComponent } from './product-reportdetails.component';

describe('ProductReportdetailsComponent', () => {
    let component: ProductReportdetailsComponent;
    let fixture: ComponentFixture<ProductReportdetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductReportdetailsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductReportdetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
