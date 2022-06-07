import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankClearanceComponent } from './bank-clearance.component';

describe('BankClearanceComponent', () => {
    let component: BankClearanceComponent;
    let fixture: ComponentFixture<BankClearanceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BankClearanceComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BankClearanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
