import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInformationComponent } from './emp-information.component';

describe('EmpInformationComponent', () => {
    let component: EmpInformationComponent;
    let fixture: ComponentFixture<EmpInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmpInformationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmpInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});