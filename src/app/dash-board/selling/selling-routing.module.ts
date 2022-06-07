import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellingComponent } from './selling.component';

const routes: Routes = [
    {
        path: '',
        component: SellingComponent,
        children: [
            {
                path: 'app-analytics',
                loadChildren: () => import("./analytics/analytics.module").then(m => m.AnalyticsModule)
            },
            {
                path: 'app-item-price-details',
                loadChildren: () => import("./item-price-details/item-price-details.module").then(m => m.ItemPriceDetailsModule)
            },
            {
                path: "app-salse",
                loadChildren: () => import("./salse/salse.module").then(m => m.SalseModule)
            },
            {
                path: "app-customers",
                loadChildren: () => import("./customers/customers.module").then(m => m.CustomersModule)
            },
            {
                path: "app-salse-pat-terr",
                loadChildren: () => import("./salse-pat-terr/salse-pat-terr.module").then(m => m.SalsePatTerrModule)
            },
            {
                path: "app-other-report",
                loadChildren: () => import("./other-report/other-report.module").then(m => m.OtherReportModule)
            },
            {
                path: "app-setup",
                loadChildren: () => import("./setup/setup.module").then(m => m.SetupModule)
            },
            {
                path: "app-selling-help",
                loadChildren: () => import("./selling-help/selling-help.module").then(m => m.SellingHelpModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SellingRoutingModule { }