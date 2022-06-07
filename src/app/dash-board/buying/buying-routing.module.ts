import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyingComponent } from './buying.component';

const routes: Routes = [
    {
        path: "",
        component: BuyingComponent,
        children: [
            {
                path: "app-purchase-details",
                loadChildren: () => import("./purchase-details/purchase-details.module").then(m => m.PurchaseDetailsModule)
            },
            {
                path: "app-supplier-details",
                loadChildren: () => import("./supplier-details/supplier-details.module").then(m => m.SupplierDetailsModule)

            },
            {
                path: 'app-item-price-details',
                loadChildren: () => import("./item-price-details/item-price-details.module").then(m => m.ItemPriceDetailsModule)
            },
            {
                path: "app-analytics",
                loadChildren: () => import("./analytics/analytics.module").then(m => m.AnalyticsModule)
            },
            {
                path: "app-buying-report-details",
                loadChildren: () => import("./buying-report-details/buying-report-details.module").then(m => m.BuyingReportDetailsModule)
            },
            {
                path: "app-setup",
                loadChildren: () => import("./setup/setup.module").then(m => m.SetupModule)
            },
            {
                path: "app-buying-help",
                loadChildren: () => import("./buying-help/buying-help.module").then(m => m.BuyingHelpModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BuyingRoutingModule { }
