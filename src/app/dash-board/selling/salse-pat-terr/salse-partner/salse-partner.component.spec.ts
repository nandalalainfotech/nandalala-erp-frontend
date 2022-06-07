import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalsePartnerComponent } from './salse-partner.component';

describe('SalsePartnerComponent', () => {
    let component: SalsePartnerComponent;
    let fixture: ComponentFixture<SalsePartnerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SalsePartnerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SalsePartnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
