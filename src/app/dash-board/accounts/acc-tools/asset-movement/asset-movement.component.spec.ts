import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMovementComponent } from './asset-movement.component';

describe('AssetMovementComponent', () => {
    let component: AssetMovementComponent;
    let fixture: ComponentFixture<AssetMovementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AssetMovementComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AssetMovementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
