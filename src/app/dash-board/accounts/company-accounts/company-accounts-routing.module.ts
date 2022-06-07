import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountChartComponent } from './account-chart/account-chart.component';
import { ComAccountComponent } from './com-account/com-account.component';
import { CompanyAccountsComponent } from './company-accounts.component';
import { GeneralLedgerComponent } from './general-ledger/general-ledger.component';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';

const routes: Routes = [
    {
        path: "",
        component: CompanyAccountsComponent,
        children: [
            {
                path: "app-general-ledger",
                component: GeneralLedgerComponent
            },
            {
                path: "app-journal-entry",
                component: JournalEntryComponent
            },
            {
                path: "app-account-chart",
                component: AccountChartComponent
            },
            {
                path: "app-com-account",
                component: ComAccountComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyAccountsRoutingModule { }
