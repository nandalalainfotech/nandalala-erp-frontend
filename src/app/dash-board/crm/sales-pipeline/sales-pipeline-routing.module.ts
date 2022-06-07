import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CRMContactComponent } from './crm-contact/crm-contact.component';
import { CRMSalesPipeLineComponent } from './crm-sales-pipe-line/crm-sales-pipe-line.component';
import { CustomerComponent } from './customer/customer.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { SalesPipelineComponent } from './sales-pipeline.component';

const routes: Routes = [
    {
        path: "",
        component: SalesPipelineComponent,
        children: [
            {
                path: 'app-crm-sales-pipe-line',
                component: CRMSalesPipeLineComponent,
            },
            {
                path: 'app-crm-contact',
                component: CRMContactComponent,
            },
            {
                path: 'app-customer',
                component: CustomerComponent,
            },
            {
                path: 'app-opportunity',
                component: OpportunityComponent,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalesPipelineRoutingModule { }
