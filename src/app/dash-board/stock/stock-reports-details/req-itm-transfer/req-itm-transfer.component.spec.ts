import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReqItmTransferComponent } from './req-itm-transfer.component';

describe('ReqItmTransferComponent', () => {
    let component: ReqItmTransferComponent;
    let fixture: ComponentFixture<ReqItmTransferComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReqItmTransferComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReqItmTransferComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});