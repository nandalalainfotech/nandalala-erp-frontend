import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurItmOrderComponent } from './pur-itm-order.component';

describe('PurItmOrderComponent', () => {
    let component: PurItmOrderComponent;
    let fixture: ComponentFixture<PurItmOrderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PurItmOrderComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PurItmOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});