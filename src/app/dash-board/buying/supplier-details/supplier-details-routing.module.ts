import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyingSupplierComponent } from './buying-supplier/buying-supplier.component';
import { SupplierDetailsComponent } from './supplier-details.component';
import { SupplierStatusComponent } from './supplier-status/supplier-status.component';
import { SupplierTypeComponent } from './supplier-type/supplier-type.component';

const routes: Routes = [
    {
        path: "",
        component: SupplierDetailsComponent,
        children: [
            {
                path: "app-buying-supplier",
                component: BuyingSupplierComponent
            },
            {
                path: "app-supplier-status",
                component: SupplierStatusComponent
            },
            {
                path: "app-supplier-type",
                component: SupplierTypeComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupplierDetailsRoutingModule { }
