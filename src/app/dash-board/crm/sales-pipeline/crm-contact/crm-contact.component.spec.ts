import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CRMContactComponent } from './crm-contact.component';

describe('CRMContactComponent', () => {
    let component: CRMContactComponent;
    let fixture: ComponentFixture<CRMContactComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CRMContactComponent]
        })
            .compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(CRMContactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
