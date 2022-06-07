import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAcLoComponent } from './customer-ac-lo.component';

describe('CustomerAcLoComponent', () => {
    let component: CustomerAcLoComponent;
    let fixture: ComponentFixture<CustomerAcLoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomerAcLoComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerAcLoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
