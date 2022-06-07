import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrderComponent } from '../billing/purchase-order/purchase-order.component';
import { AnalyticsComponent } from './analytics.component';
import { GrossProfitComponent } from './gross-profit/gross-profit.component';
import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';


const routes: Routes = [
    {
        path: "",
        component: AnalyticsComponent,
        children: [
            {
                path: "app-gross-profit",
                component: GrossProfitComponent
            },
            {
                path: "app-purchase-invoice",
                component: PurchaseInvoiceComponent
            },
            {
                path: "app-sales-invoice",
                component: SalesInvoiceComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
