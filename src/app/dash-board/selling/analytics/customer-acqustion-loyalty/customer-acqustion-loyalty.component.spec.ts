import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerAcqustionLoyaltyComponent } from './customer-acqustion-loyalty.component';

describe('CustomerAcqustionLoyaltyComponent', () => {
    let component: CustomerAcqustionLoyaltyComponent;
    let fixture: ComponentFixture<CustomerAcqustionLoyaltyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomerAcqustionLoyaltyComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerAcqustionLoyaltyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
