import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseClaimComponent } from './expense-claim.component';
import { ExpensesClaimsComponent } from './expenses-claims/expenses-claims.component';

const routes: Routes = [
	{
		path: "",
		component: ExpenseClaimComponent,
		children: [
			{
				path: "app-expenses-claims",
				component: ExpensesClaimsComponent,
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ExpenseClaimRoutingModule { }
