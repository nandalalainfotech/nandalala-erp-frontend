import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressOrderComponent } from './progress-order.component';

describe('ProgressOrderComponent', () => {
    let component: ProgressOrderComponent;
    let fixture: ComponentFixture<ProgressOrderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProgressOrderComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
