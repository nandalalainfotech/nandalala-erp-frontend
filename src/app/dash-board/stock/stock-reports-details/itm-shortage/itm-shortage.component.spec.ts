import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItmShortageComponent } from './itm-shortage.component';

describe('ItmShortageComponent', () => {
    let component: ItmShortageComponent;
    let fixture: ComponentFixture<ItmShortageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItmShortageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItmShortageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});