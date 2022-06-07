import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReportDetailsComponent } from './item-report-details.component';

describe('ItemReportDetailsComponent', () => {
    let component: ItemReportDetailsComponent;
    let fixture: ComponentFixture<ItemReportDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemReportDetailsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemReportDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
