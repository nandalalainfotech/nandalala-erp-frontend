import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomTypeComponent } from './bom-type.component';

describe('BomTypeComponent', () => {
    let component: BomTypeComponent;
    let fixture: ComponentFixture<BomTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BomTypeComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BomTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
