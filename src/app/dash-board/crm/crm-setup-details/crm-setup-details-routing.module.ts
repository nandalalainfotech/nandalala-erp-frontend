import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmCommunicationComponent } from './crm-communication/crm-communication.component';
import { CrmCustGroupComponent } from './crm-cust-group/crm-cust-group.component';
import { CrmSetupDetailsComponent } from './crm-setup-details.component';
import { CrmTerritoryComponent } from './crm-territory/crm-territory.component';

const routes: Routes = [
    {
        path: "",
        component: CrmSetupDetailsComponent,
        children: [
            {
                path: "app-crm-communication",
                component: CrmCommunicationComponent
            },
            {
                path: "app-crm-cust-group",
                component: CrmCustGroupComponent
            },
            {
                path: "app-crm-territory",
                component: CrmTerritoryComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CrmSetupDetailsRoutingModule { }
