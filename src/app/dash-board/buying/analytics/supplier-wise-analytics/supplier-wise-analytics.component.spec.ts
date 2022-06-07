import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierWiseAnalyticsComponent } from './supplier-wise-analytics.component';

describe('SupplierWiseAnalyticsComponent', () => {
    let component: SupplierWiseAnalyticsComponent;
    let fixture: ComponentFixture<SupplierWiseAnalyticsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SupplierWiseAnalyticsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SupplierWiseAnalyticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
