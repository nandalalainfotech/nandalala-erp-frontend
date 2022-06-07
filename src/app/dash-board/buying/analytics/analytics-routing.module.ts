import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyingComponent } from '../buying.component';
import { AnalyticsComponent } from './analytics.component';
import { OrderTrendComponent } from './order-trend/order-trend.component';
import { PuAnalyticsComponent } from './pu-analytics/pu-analytics.component';
import { SupplierWiseAnalyticsComponent } from './supplier-wise-analytics/supplier-wise-analytics.component';

const routes: Routes = [
    {
        path: "",
        component: AnalyticsComponent,
        children: [
            {
                path: 'app-pu-analytics',
                component: PuAnalyticsComponent,
            },
            {
                path: 'app-supplier-wise-analytics',
                component: SupplierWiseAnalyticsComponent,
            },
            {
                path: 'app-order-trend',
                component: OrderTrendComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
