import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderTrendsComponent } from './sales-order-trends.component';

describe('SalesOrderTrendsComponent', () => {
    let component: SalesOrderTrendsComponent;
    let fixture: ComponentFixture<SalesOrderTrendsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SalesOrderTrendsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SalesOrderTrendsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
