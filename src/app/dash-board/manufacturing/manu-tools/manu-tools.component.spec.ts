import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuToolsComponent } from './manu-tools.component';

describe('ManuToolsComponent', () => {
	let component: ManuToolsComponent;
	let fixture: ComponentFixture<ManuToolsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ManuToolsComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ManuToolsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
