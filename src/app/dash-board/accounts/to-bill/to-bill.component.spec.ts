import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBillComponent } from './to-bill.component';

describe('ToBillComponent', () => {
    let component: ToBillComponent;
    let fixture: ComponentFixture<ToBillComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToBillComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToBillComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
