import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts.component';


const routes: Routes = [
    {
        path: "",
        component: AccountsComponent,
        children: [
            {
                path: "app-billing",
                loadChildren: () => import("./billing/billing.module").then(m => m.BillingModule)
            },
            {
                path: "app-company-accounts",
                loadChildren: () => import("./company-accounts/company-accounts.module").then(m => m.CompanyAccountsModule)
            },
            {
                path: "app-master",
                loadChildren: () => import("./master/master.module").then(m => m.MasterModule)
            },
            {
                path: "app-accounting-stmts",
                loadChildren: () => import("./accounting-stmts/accounting-stmts.module").then(m => m.AccountingStmtsModule)
            },
            {
                path: "app-banking-payments",
                loadChildren: () => import("./banking-payments/banking-payments.module").then(m => m.BankingPaymentsModule)
            },
            {
                path: "app-taxes",
                loadChildren: () => import("./taxes/taxes.module").then(m => m.TaxesModule)
            },
            {
                path: "app-budget-costcenter",
                loadChildren: () => import("./budget-costcenter/budget-costcenter.module").then(m => m.BudgetCostcenterModule)
            },
            {
                path: "app-acc-tools",
                loadChildren: () => import("./acc-tools/acc-tools.module").then(m => m.AccToolsModule)
            },
            {
                path: "app-account-setup",
                loadChildren: () => import("./account-setup/account-setup.module").then(m => m.AccountSetupModule)
            },
            {
                path: "app-to-bill",
                loadChildren: () => import("./to-bill/to-bill.module").then(m => m.ToBillModule)
            },
            {
                path: "app-analytics",
                loadChildren: () => import("./analytics/analytics.module").then(m => m.AnalyticsModule)
            },
            {
                path: "app-other-reports",
                loadChildren: () => import("./other-reports/other-reports.module").then(m => m.OtherReportsModule)
            },
            {
                path: "app-account-help",
                loadChildren: () => import("./account-help/account-help.module").then(m => m.AccountHelpModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule { }
