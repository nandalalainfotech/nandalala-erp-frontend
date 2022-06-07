import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSetupDetailsComponent } from './crm-setup-details.component';

describe('CrmSetupDetailsComponent', () => {
    let component: CrmSetupDetailsComponent;
    let fixture: ComponentFixture<CrmSetupDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CrmSetupDetailsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CrmSetupDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
