import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockToolsComponent } from './stock-tools.component';

describe('StockToolsComponent', () => {
    let component: StockToolsComponent;
    let fixture: ComponentFixture<StockToolsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StockToolsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StockToolsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
