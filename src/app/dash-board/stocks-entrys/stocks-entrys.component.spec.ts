import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksEntrysComponent } from './stocks-entrys.component';

describe('StocksEntrysComponent', () => {
    let component: StocksEntrysComponent;
    let fixture: ComponentFixture<StocksEntrysComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StocksEntrysComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StocksEntrysComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
