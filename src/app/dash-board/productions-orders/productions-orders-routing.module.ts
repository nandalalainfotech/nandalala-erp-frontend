import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionOrdersComponent } from './production-orders/production-orders.component';

import { ProductionsOrdersComponent } from './productions-orders.component';

const routes: Routes = [{

    path: "",
    component: ProductionsOrdersComponent,
    children: [
        {
            path: 'app-production-orders',
            component: ProductionOrdersComponent,
        }]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductionsOrdersRoutingModule { }
