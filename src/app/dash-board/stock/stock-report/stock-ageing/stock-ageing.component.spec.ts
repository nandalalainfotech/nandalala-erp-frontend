import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAgeingComponent } from './stock-ageing.component';

describe('StockAgeingComponent', () => {
    let component: StockAgeingComponent;
    let fixture: ComponentFixture<StockAgeingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StockAgeingComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StockAgeingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
