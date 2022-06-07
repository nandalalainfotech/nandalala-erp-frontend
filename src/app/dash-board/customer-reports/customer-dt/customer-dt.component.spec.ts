import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDtComponent } from './customer-dt.component';

describe('CustomerDtComponent', () => {
    let component: CustomerDtComponent;
    let fixture: ComponentFixture<CustomerDtComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomerDtComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerDtComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
