import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support.component';

const routes: Routes = [
    {
        path: '',
        component: SupportComponent,
        children: [
            {
                path: 'app-support-issues',
                loadChildren: () => import("./support-issues/support-issues.module").then(m => m.SupportIssuesModule)
            },
            {
                path: 'app-warranty',
                loadChildren: () => import("./warranty/warranty.module").then(m => m.WarrantyModule)
            },
            {
                path: 'app-reports',
                loadChildren: () => import("./reports/reports.module").then(m => m.ReportsModule)
            },
            {
                path: 'app-support-help',
                loadChildren: () => import("./support-help/support-help.module").then(m => m.SupportHelpModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupportRoutingModule { }
