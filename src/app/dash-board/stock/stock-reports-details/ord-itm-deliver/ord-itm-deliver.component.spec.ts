import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdItmDeliverComponent } from './ord-itm-deliver.component';

describe('OrdItmDeliverComponent', () => {
    let component: OrdItmDeliverComponent;
    let fixture: ComponentFixture<OrdItmDeliverComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrdItmDeliverComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdItmDeliverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});