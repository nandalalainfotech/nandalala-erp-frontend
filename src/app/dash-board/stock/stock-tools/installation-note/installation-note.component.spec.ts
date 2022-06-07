import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationNoteComponent } from './installation-note.component';

describe('InstallationNoteComponent', () => {
    let component: InstallationNoteComponent;
    let fixture: ComponentFixture<InstallationNoteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InstallationNoteComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InstallationNoteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
