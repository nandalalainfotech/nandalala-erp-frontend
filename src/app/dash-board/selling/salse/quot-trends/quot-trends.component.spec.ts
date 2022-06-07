import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotTrendsComponent } from './quot-trends.component';

describe('QuotTrendsComponent', () => {
    let component: QuotTrendsComponent;
    let fixture: ComponentFixture<QuotTrendsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuotTrendsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuotTrendsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
