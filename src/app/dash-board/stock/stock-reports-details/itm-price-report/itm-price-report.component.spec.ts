import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItmPriceReportComponent } from './itm-price-report.component';

describe('ItmPriceReportComponent', () => {
    let component: ItmPriceReportComponent;
    let fixture: ComponentFixture<ItmPriceReportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItmPriceReportComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItmPriceReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});