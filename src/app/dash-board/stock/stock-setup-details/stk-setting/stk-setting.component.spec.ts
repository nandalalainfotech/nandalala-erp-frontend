import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StkSettingComponent } from './stk-setting.component';

describe('StkSettingComponent', () => {
    let component: StkSettingComponent;
    let fixture: ComponentFixture<StkSettingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StkSettingComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StkSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});