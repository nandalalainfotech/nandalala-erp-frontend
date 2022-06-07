import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinutesResponseIssuesComponent } from './minutes-response-issues/minutes-response-issues.component';
import { ReportsComponent } from './reports.component';
import { SupportAnalyticsComponent } from './support-analytics/support-analytics.component';

const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        children: [
            {
                path: 'app-support-analytics',
                component: SupportAnalyticsComponent
            },
            {
                path: 'app-minutes-response-issues',
                component: MinutesResponseIssuesComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
