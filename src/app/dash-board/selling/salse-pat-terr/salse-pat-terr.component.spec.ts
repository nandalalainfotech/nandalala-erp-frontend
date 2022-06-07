import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalsePatTerrComponent } from './salse-pat-terr.component';

describe('SalsePatTerrComponent', () => {
    let component: SalsePatTerrComponent;
    let fixture: ComponentFixture<SalsePatTerrComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SalsePatTerrComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SalsePatTerrComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
