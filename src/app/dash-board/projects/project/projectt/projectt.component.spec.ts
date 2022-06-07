import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecttComponent } from './projectt.component';

describe('ProjecttComponent', () => {
    let component: ProjecttComponent;
    let fixture: ComponentFixture<ProjecttComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProjecttComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjecttComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
