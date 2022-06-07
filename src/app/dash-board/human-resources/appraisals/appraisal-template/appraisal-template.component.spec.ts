import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalTemplateComponent } from './appraisal-template.component';

describe('AppraisalTemplateComponent', () => {
    let component: AppraisalTemplateComponent;
    let fixture: ComponentFixture<AppraisalTemplateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppraisalTemplateComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppraisalTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
