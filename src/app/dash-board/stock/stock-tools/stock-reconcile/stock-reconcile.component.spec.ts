import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReconcileComponent } from './stock-reconcile.component';

describe('StockReconcileComponent', () => {
    let component: StockReconcileComponent;
    let fixture: ComponentFixture<StockReconcileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StockReconcileComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StockReconcileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
