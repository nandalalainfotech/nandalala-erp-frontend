import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrderComponent } from '../billing/purchase-order/purchase-order.component';
import { ReceivedItemsComponent } from '../billing/received-items/received-items.component';
import { DeliverItemComponent } from './deliver-item/deliver-item.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { ToBillComponent } from './to-bill.component';

const routes: Routes = [
    {
        path: "",
        component: ToBillComponent,
        children: [
            {
                path: "app-order-item",
                component: OrderItemComponent
            },
            {
                path: "app-deliver-item",
                component: DeliverItemComponent
            },
            {
                path: "app-purchase-item",
                component: PurchaseOrderComponent
            },
            {
                path: "app-receive-item",
                component: ReceivedItemsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToBillRoutingModule { }
