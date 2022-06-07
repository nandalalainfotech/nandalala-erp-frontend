import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailableStockComponent } from './available-stock/available-stock.component';
import { BillOfMaterialComponent } from './bill-of-material/bill-of-material.component';
import { CustomerCreditBalanceComponent } from './customer-credit-balance/customer-credit-balance.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { InactiveCustomerComponent } from './inactive-customer/inactive-customer.component';
import { ItemWiseComponent } from './item-wise/item-wise.component';
import { LeadDetailComponent } from './lead-detail/lead-detail.component';
import { OrderItemBilledComponent } from './order-item-billed/order-item-billed.component';
import { OtherReportComponent } from './other-report.component';
import { PendingItemComponent } from './pending-item/pending-item.component';
import { SalesPersonComponent } from './sales-person/sales-person.component';


const routes: Routes = [
    {
        path: "",
        component: OtherReportComponent,
        children: [
            {
                path: 'app-lead-detail',
                component: LeadDetailComponent
            },
            {
                path: 'app-customer-detail',
                component: CustomerDetailComponent
            },
            {
                path: 'app-order-item-billed',
                component: OrderItemBilledComponent
            },
            {
                path: 'app-sales-person',
                component: SalesPersonComponent
            },
            {
                path: 'app-item-wise',
                component: ItemWiseComponent
            },
            {
                path: 'app-bill-of-material',
                component: BillOfMaterialComponent
            },
            {
                path: 'app-inactive-customer',
                component: InactiveCustomerComponent
            },
            {
                path: 'app-available-stock',
                component: AvailableStockComponent
            },
            {
                path: 'app-pending-item',
                component: PendingItemComponent
            },
            {
                path: 'app-customer-credit-balance',
                component: CustomerCreditBalanceComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OtherReportRoutingModule { }
