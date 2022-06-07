import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCommunicationComponent } from './crm-communication.component';

describe('CrmCommunicationComponent', () => {
    let component: CrmCommunicationComponent;
    let fixture: ComponentFixture<CrmCommunicationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CrmCommunicationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CrmCommunicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
