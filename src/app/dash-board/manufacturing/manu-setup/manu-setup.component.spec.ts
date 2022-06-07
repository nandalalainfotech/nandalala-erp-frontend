import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuSetupComponent } from './manu-setup.component';

describe('ManuSetupComponent', () => {
    let component: ManuSetupComponent;
    let fixture: ComponentFixture<ManuSetupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ManuSetupComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ManuSetupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
