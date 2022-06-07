import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCrtBalComponent } from './customer-crt-bal.component';

describe('CustomerCrtBalComponent', () => {
    let component: CustomerCrtBalComponent;
    let fixture: ComponentFixture<CustomerCrtBalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomerCrtBalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerCrtBalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
