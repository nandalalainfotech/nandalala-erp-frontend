import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCustGroupComponent } from './crm-cust-group.component';

describe('CrmCustGroupComponent', () => {
    let component: CrmCustGroupComponent;
    let fixture: ComponentFixture<CrmCustGroupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CrmCustGroupComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CrmCustGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
