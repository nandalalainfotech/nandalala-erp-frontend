import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinutesFirstResponseComponent } from './minutes-first-response/minutes-first-response.component';
import { SalesOrderComponent } from './sales-order.component';
import { SupportAnalyticsComponent } from './support-analytics/support-analytics.component';


const routes: Routes = [
    {
        path: '',
        component: SalesOrderComponent,
        children: [
            {
                path: 'app-support-analytics',
                component: SupportAnalyticsComponent
            },
            {
                path: 'app-minutes-first-response',
                component: MinutesFirstResponseComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalesOrderRoutingModule { }
