import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrreqQuotComponent } from './prreq-quot.component';

describe('PrreqQuotComponent', () => {
    let component: PrreqQuotComponent;
    let fixture: ComponentFixture<PrreqQuotComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PrreqQuotComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PrreqQuotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
