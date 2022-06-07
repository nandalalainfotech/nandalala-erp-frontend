import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuotationTrendsComponent } from './quotation-trends.component';

describe('QuotationTrendsComponent', () => {
    let component: QuotationTrendsComponent;
    let fixture: ComponentFixture<QuotationTrendsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuotationTrendsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuotationTrendsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
