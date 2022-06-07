import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTimeResComponent } from './mini-time-res.component';

describe('MiniTimeResComponent', () => {
    let component: MiniTimeResComponent;
    let fixture: ComponentFixture<MiniTimeResComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MiniTimeResComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MiniTimeResComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
