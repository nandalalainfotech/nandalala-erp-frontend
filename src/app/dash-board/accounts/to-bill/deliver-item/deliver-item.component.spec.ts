import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverItemComponent } from './deliver-item.component';

describe('DeliverItemComponent', () => {
    let component: DeliverItemComponent;
    let fixture: ComponentFixture<DeliverItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeliverItemComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeliverItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
