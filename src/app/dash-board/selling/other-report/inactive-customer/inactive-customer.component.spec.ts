import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveCustomerComponent } from './inactive-customer.component';

describe('InactiveCustomerComponent', () => {
    let component: InactiveCustomerComponent;
    let fixture: ComponentFixture<InactiveCustomerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InactiveCustomerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InactiveCustomerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
