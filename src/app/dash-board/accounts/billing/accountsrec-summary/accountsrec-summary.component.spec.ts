import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsrecSummaryComponent } from './accountsrec-summary.component';

describe('AccountsrecSummaryComponent', () => {
    let component: AccountsrecSummaryComponent;
    let fixture: ComponentFixture<AccountsrecSummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountsrecSummaryComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountsrecSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
