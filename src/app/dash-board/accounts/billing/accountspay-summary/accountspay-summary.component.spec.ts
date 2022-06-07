import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountspaySummaryComponent } from './accountspay-summary.component';

describe('AccountspaySummaryComponent', () => {
    let component: AccountspaySummaryComponent;
    let fixture: ComponentFixture<AccountspaySummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountspaySummaryComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountspaySummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
