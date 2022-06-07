import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CRMSalesPipeLineComponent } from './crm-sales-pipe-line.component';

describe('CRMSalesPipeLineComponent', () => {
    let component: CRMSalesPipeLineComponent;
    let fixture: ComponentFixture<CRMSalesPipeLineComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CRMSalesPipeLineComponent]
        })
            .compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(CRMSalesPipeLineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
