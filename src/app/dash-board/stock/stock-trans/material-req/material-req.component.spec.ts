import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReqComponent } from './material-req.component';

describe('MaterialReqComponent', () => {
    let component: MaterialReqComponent;
    let fixture: ComponentFixture<MaterialReqComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MaterialReqComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MaterialReqComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
