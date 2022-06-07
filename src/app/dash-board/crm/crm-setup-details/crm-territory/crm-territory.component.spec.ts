import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmTerritoryComponent } from './crm-territory.component';

describe('CrmTerritoryComponent', () => {
    let component: CrmTerritoryComponent;
    let fixture: ComponentFixture<CrmTerritoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CrmTerritoryComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CrmTerritoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
