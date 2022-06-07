import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmCommDetailsComponent } from './crm-comm-details/crm-comm-details.component';
import { CrmComponent } from './crm.component';

const routes: Routes = [
    {
        path: "",
        component: CrmComponent,
        children: [
            {
                path: "app-crm-report-details",
                loadChildren: () => import("./crm-report-details/crm-report-details.module").then(m => m.CrmReportDetailsModule)
            },
            {
                path: "app-crm-setup-details",
                loadChildren: () => import("./crm-setup-details/crm-setup-details.module").then(m => m.CrmSetupDetailsModule)
            },
            {
                path: "app-crm-comm-details",
                loadChildren: () => import("./crm-comm-details/crm-comm-details.module").then(m => m.CrmCommDetailsModule)
            },
            {
                path: "app-sales-pipeline",
                loadChildren: () => import("./sales-pipeline/sales-pipeline.module").then(m => m.SalesPipelineModule)
            },
            {
                path: "app-crm-help",
                loadChildren: () => import("./crm-help/crm-help.module").then(m => m.CrmHelpModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CrmRoutingModule { }
