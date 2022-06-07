import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingStmtsComponent } from './accounting-stmts.component';

describe('AccountingStmtsComponent', () => {
    let component: AccountingStmtsComponent;
    let fixture: ComponentFixture<AccountingStmtsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountingStmtsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountingStmtsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
