import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeprintTemplateComponent } from './chequeprint-template.component';

describe('ChequeprintTemplateComponent', () => {
    let component: ChequeprintTemplateComponent;
    let fixture: ComponentFixture<ChequeprintTemplateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChequeprintTemplateComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChequeprintTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
