import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccToolsComponent } from './acc-tools.component';

describe('AccToolsComponent', () => {
    let component: AccToolsComponent;
    let fixture: ComponentFixture<AccToolsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccToolsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccToolsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
