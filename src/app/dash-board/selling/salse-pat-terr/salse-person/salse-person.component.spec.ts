import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalsePersonComponent } from './salse-person.component';

describe('SalsePersonComponent', () => {
    let component: SalsePersonComponent;
    let fixture: ComponentFixture<SalsePersonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SalsePersonComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SalsePersonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
