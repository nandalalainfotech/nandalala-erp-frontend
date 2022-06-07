import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesClaimsComponent } from './expenses-claims.component';

describe('ExpensesClaimsComponent', () => {
	let component: ExpensesClaimsComponent;
	let fixture: ComponentFixture<ExpensesClaimsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ExpensesClaimsComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ExpensesClaimsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
