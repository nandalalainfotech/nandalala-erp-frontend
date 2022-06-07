import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectedQuantityComponent } from './projected-quantity.component';

describe('ProjectedQuantityComponent', () => {
    let component: ProjectedQuantityComponent;
    let fixture: ComponentFixture<ProjectedQuantityComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProjectedQuantityComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectedQuantityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
