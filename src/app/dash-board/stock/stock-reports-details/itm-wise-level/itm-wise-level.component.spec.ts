import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItmWiseLevelComponent } from './itm-wise-level.component';

describe('ItmWiseLevelComponent', () => {
    let component: ItmWiseLevelComponent;
    let fixture: ComponentFixture<ItmWiseLevelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItmWiseLevelComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItmWiseLevelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});