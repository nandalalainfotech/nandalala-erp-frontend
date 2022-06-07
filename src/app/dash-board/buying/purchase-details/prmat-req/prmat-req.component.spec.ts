import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrmatReqComponent } from './prmat-req.component';

describe('PrmatReqComponent', () => {
    let component: PrmatReqComponent;
    let fixture: ComponentFixture<PrmatReqComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PrmatReqComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PrmatReqComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
