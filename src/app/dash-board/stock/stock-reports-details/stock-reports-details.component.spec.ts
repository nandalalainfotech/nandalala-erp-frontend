import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockReportsDetailsComponent } from './stock-reports-details.component';

describe('StockReportsDetailsComponent', () => {
    let component: StockReportsDetailsComponent;
    let fixture: ComponentFixture<StockReportsDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StockReportsDetailsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StockReportsDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});