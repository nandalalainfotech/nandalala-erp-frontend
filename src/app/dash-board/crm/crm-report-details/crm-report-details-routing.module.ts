import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmLeadDetailsComponent } from './crm-lead-details/crm-lead-details.component';

import { CrmReportDetailsComponent } from './crm-report-details.component';
import { CustomersComponent } from './customers/customers.component';
import { InactiveCustomersComponent } from './inactive-customers/inactive-customers.component';
import { MiniTimeResComponent } from './mini-time-res/mini-time-res.component';

const routes: Routes = [
    {
        path: "",
        component: CrmReportDetailsComponent,
        children: [
            {
                path: "app-mini-time-res",
                component: MiniTimeResComponent
            },
            {
                path: "app-crm-lead-details",
                component: CrmLeadDetailsComponent
            },
            {
                path: "app-inactive-customers",
                component: InactiveCustomersComponent
            },
            {
                path: "app-customers",
                component: CustomersComponent
            }
        ]


    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CrmReportDetailsRoutingModule { }
