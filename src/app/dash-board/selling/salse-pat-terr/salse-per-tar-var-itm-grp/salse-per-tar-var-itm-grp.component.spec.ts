import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalsePerTarVarItmGrpComponent } from './salse-per-tar-var-itm-grp.component';

describe('SalsePerTarVarItmGrpComponent', () => {
    let component: SalsePerTarVarItmGrpComponent;
    let fixture: ComponentFixture<SalsePerTarVarItmGrpComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SalsePerTarVarItmGrpComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SalsePerTarVarItmGrpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
