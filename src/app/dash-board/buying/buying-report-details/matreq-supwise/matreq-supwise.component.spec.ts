import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatreqSupwiseComponent } from './matreq-supwise.component';

describe('MatreqSupwiseComponent', () => {
    let component: MatreqSupwiseComponent;
    let fixture: ComponentFixture<MatreqSupwiseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MatreqSupwiseComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MatreqSupwiseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
