import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalseOrderComponent } from './salse-order.component';

describe('SalseOrderComponent', () => {
    let component: SalseOrderComponent;
    let fixture: ComponentFixture<SalseOrderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SalseOrderComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SalseOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
