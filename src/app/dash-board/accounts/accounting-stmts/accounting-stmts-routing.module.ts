import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountingStmtsComponent } from './accounting-stmts.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { TrialBalanceComponent } from './trial-balance/trial-balance.component';

const routes: Routes = [
    {
        path: "",
        component: AccountingStmtsComponent,
        children: [
            {
                path: "app-trial-balance",
                component: TrialBalanceComponent
            },
            {
                path: "app-balance-sheet",
                component: BalanceSheetComponent
            },
            {
                path: "app-profit-loss",
                component: ProfitLossComponent
            },
            {
                path: "app-cash-flow",
                component: CashFlowComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountingStmtsRoutingModule { }
