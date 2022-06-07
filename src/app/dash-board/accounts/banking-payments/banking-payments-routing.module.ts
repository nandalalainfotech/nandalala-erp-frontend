import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankClearanceComponent } from './bank-clearance/bank-clearance.component';
import { BankReconciliationComponent } from './bank-reconciliation/bank-reconciliation.component';
import { BankingPaymentsComponent } from './banking-payments.component';
import { MatchPaymentsComponent } from './match-payments/match-payments.component';
import { UpdateBankComponent } from './update-bank/update-bank.component';

const routes: Routes = [
    {
        path: "",
        component: BankingPaymentsComponent,
        children: [
            {
                path: "app-update-bank",
                component: UpdateBankComponent
            },
            {
                path: "app-match-payments",
                component: MatchPaymentsComponent
            },
            {
                path: "app-bank-reconciliation",
                component: BankReconciliationComponent
            },
            {
                path: "app-bank-clearance",
                component: BankClearanceComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BankingPaymentsRoutingModule { }
