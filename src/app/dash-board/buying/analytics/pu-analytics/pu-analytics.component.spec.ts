import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuAnalyticsComponent } from './pu-analytics.component';

describe('PuAnalyticsComponent', () => {
    let component: PuAnalyticsComponent;
    let fixture: ComponentFixture<PuAnalyticsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PuAnalyticsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PuAnalyticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
