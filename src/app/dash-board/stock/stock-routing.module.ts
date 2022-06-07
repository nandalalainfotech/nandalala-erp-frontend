import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock.component';

const routes: Routes = [
    {
        path: '',
        component: StockComponent,
        children: [
            {
                path: 'app-stock-trans',
                loadChildren: () => import("./stock-trans/stock-trans.module").then(m => m.StockTransModule)
            },
            {
                path: 'app-stock-report',
                loadChildren: () => import("./stock-report/stock-report.module").then(m => m.StockReportModule)
            },
            {
                path: 'app-items-pricing',
                loadChildren: () => import("./items-pricing/items-pricing.module").then(m => m.ItemsPricingModule)
            },
            {
                path: 'app-stock-tools',
                loadChildren: () => import("./stock-tools/stock-tools.module").then(m => m.StockToolsModule)
            },
            {
                path: 'app-stock-setup-details',
                loadChildren: () => import("./stock-setup-details/stock-setup-details.module").then(m => m.StockSetupDetailsModule)
            },
            {
                path: 'app-stock-analytics-details',
                loadChildren: () => import("./stock-analytics-details/stock-analytics-details.module").then(m => m.StockAnalyticsDetailsModule)
            },
            {
                path: 'app-stock-reports-details',
                loadChildren: () => import("./stock-reports-details/stock-reports-details.module").then(m => m.StockReportsDetailsModule)
            },
            {
                path: 'app-stock-help',
                loadChildren: () => import("./stock-help/stock-help.module").then(m => m.StockHelpModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockRoutingModule { }
