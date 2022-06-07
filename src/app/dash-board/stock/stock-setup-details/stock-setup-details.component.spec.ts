import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSetupDetailsComponent } from './stock-setup-details.component';

describe('StockSetupDetailsComponent', () => {
    let component: StockSetupDetailsComponent;
    let fixture: ComponentFixture<StockSetupDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StockSetupDetailsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StockSetupDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});