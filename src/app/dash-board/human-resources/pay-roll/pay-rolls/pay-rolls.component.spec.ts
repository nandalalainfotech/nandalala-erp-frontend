import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayRollsComponent } from './pay-rolls.component';

describe('PayRollsComponent', () => {
    let component: PayRollsComponent;
    let fixture: ComponentFixture<PayRollsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PayRollsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PayRollsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
