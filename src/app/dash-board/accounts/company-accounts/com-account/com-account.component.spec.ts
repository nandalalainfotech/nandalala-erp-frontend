import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComAccountComponent } from './com-account.component';

describe('ComAccountComponent', () => {
    let component: ComAccountComponent;
    let fixture: ComponentFixture<ComAccountComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ComAccountComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ComAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
