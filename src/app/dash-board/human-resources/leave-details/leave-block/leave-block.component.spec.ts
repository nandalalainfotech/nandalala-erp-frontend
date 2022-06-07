import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBlockComponent } from './leave-block.component';

describe('LeaveBlockComponent', () => {
    let component: LeaveBlockComponent;
    let fixture: ComponentFixture<LeaveBlockComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LeaveBlockComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LeaveBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
