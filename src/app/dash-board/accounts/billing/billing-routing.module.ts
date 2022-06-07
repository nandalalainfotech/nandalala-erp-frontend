import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsPayableComponent } from './accounts-payable/accounts-payable.component';
import { AccountsReceivableComponent } from './accounts-receivable/accounts-receivable.component';
import { AccountspaySummaryComponent } from './accountspay-summary/accountspay-summary.component';
import { AccountsrecSummaryComponent } from './accountsrec-summary/accountsrec-summary.component';
import { BillingComponent } from './billing.component';
import { DeliveredItemsComponent } from './delivered-items/delivered-items.component';
import { GrossProfitComponent } from './gross-profit/gross-profit.component';
import { ItemwisePurchaseComponent } from './itemwise-purchase/itemwise-purchase.component';
import { ItemwisepurchaseComponent } from './itemwisepurchase/itemwisepurchase.component';
import { OrderBillComponent } from './order-bill/order-bill.component';
import { PaymentEntryComponent } from './payment-entry/payment-entry.component';
import { PaymentRequestComponent } from './payment-request/payment-request.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ReceivedItemsComponent } from './received-items/received-items.component';

const routes: Routes = [
    {
        path: "",
        component: BillingComponent,
        children: [
            {
                path: "app-accounts-receivable",
                component: AccountsReceivableComponent
            },

            {
                path: "app-delivered-items",
                component: DeliveredItemsComponent
            },
            {
                path: "app-gross-profit",
                component: GrossProfitComponent
            },
            {
                path: "app-order-bill",
                component: OrderBillComponent
            },
            {
                path: "app-accounts-payable",
                component: AccountsPayableComponent
            },
            {
                path: "app-accountspay-summary",
                component: AccountspaySummaryComponent
            },
            {
                path: "app-received-items",
                component: ReceivedItemsComponent
            },
            {
                path: "app-itemwise-purchase",
                component: ItemwisePurchaseComponent
            },
            {
                path: "app-purchase-order",
                component: PurchaseOrderComponent
            },
            {
                path: "app-accountsrec-summary",
                component: AccountsrecSummaryComponent
            },
            {
                path: "app-payment-request",
                component: PaymentRequestComponent
            },
            {
                path: "app-payment-entry",
                component: PaymentEntryComponent
            },
            {
                path: "app-itemwisepurchase",
                component: ItemwisepurchaseComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BillingRoutingModule { }
