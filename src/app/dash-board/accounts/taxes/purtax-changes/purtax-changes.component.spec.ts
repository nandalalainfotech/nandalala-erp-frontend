import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurtaxChangesComponent } from './purtax-changes.component';

describe('PurtaxChangesComponent', () => {
    let component: PurtaxChangesComponent;
    let fixture: ComponentFixture<PurtaxChangesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PurtaxChangesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PurtaxChangesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
