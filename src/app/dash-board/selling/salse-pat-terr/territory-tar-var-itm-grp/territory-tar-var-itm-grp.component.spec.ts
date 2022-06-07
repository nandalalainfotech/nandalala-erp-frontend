import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryTarVarItmGrpComponent } from './territory-tar-var-itm-grp.component';

describe('TerritoryTarVarItmGrpComponent', () => {
    let component: TerritoryTarVarItmGrpComponent;
    let fixture: ComponentFixture<TerritoryTarVarItmGrpComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TerritoryTarVarItmGrpComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TerritoryTarVarItmGrpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
