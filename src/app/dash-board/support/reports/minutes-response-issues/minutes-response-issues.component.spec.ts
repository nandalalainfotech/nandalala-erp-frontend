import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesResponseIssuesComponent } from './minutes-response-issues.component';

describe('MinutesResponseIssuesComponent', () => {
    let component: MinutesResponseIssuesComponent;
    let fixture: ComponentFixture<MinutesResponseIssuesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MinutesResponseIssuesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MinutesResponseIssuesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
