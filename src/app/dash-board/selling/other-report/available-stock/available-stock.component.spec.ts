import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableStockComponent } from './available-stock.component';

describe('AvailableStockComponent', () => {
    let component: AvailableStockComponent;
    let fixture: ComponentFixture<AvailableStockComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AvailableStockComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AvailableStockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
