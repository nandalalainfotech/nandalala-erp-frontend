import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { CustomerAcqustionLoyaltyComponent } from './customer-acqustion-loyalty/customer-acqustion-loyalty.component';
import { QuotationTrendsComponent } from './quotation-trends/quotation-trends.component';
import { SalesAnalyticsComponent } from './sales-analytics/sales-analytics.component';
import { SalesFunnelComponent } from './sales-funnel/sales-funnel.component';
import { SalesOrderTrendsComponent } from './sales-order-trends/sales-order-trends.component';

const routes: Routes = [
    {
        path: '',
        component: AnalyticsComponent,
        children: [
            {
                path: 'app-sales-analytics',
                component: SalesAnalyticsComponent
            },
            {
                path: 'app-sales-funnel',
                component: SalesFunnelComponent
            },
            {
                path: 'app-customer-acqustion-loyalty',
                component: CustomerAcqustionLoyaltyComponent
            },
            {
                path: 'app-quotation-trends',
                component: QuotationTrendsComponent
            },
            {
                path: 'app-sales-order-trends',
                component: SalesOrderTrendsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
