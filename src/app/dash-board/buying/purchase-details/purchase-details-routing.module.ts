import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrmatReqComponent } from './prmat-req/prmat-req.component';
import { PrreqQuotComponent } from './prreq-quot/prreq-quot.component';
import { PurchaseDetailsComponent } from './purchase-details.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { SupplierQuotComponent } from './supplier-quot/supplier-quot.component';

const routes: Routes = [
    {
        path: "",
        component: PurchaseDetailsComponent,
        children: [
            {
                path: 'app-prmat-req',
                component: PrmatReqComponent
            },
            {
                path: 'app-prreq-quot',
                component: PrreqQuotComponent
            },
            {
                path: 'app-purchase-order',
                component: PurchaseOrderComponent
            },
            {
                path: 'app-supplier-quot',
                component: SupplierQuotComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchaseDetailsRoutingModule { }
