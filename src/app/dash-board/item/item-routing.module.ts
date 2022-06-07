import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemComponent } from './item.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';


const routes: Routes = [
    {
        path: '',
        component: ItemComponent,
        children: [
            {
                path: 'app-sales-order',
                component: SalesOrderComponent
            },
            {
                path: 'app-order-details',
                component: OrderDetailsComponent
            },
            {
                path: 'app-item-details',
                component: ItemDetailsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemRoutingModule { }
