import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetComponent } from './asset/asset.component';
import { CustomerComponent } from './customer/customer.component';
import { ItemComponent } from './item/item.component';
import { MasterComponent } from './master.component';
import { SupplierComponent } from './supplier/supplier.component';

const routes: Routes = [
    {
        path: "",
        component: MasterComponent,
        children: [
            {
                path: "app-asset",
                component: AssetComponent
            },
            {
                path: "app-customer",
                component: CustomerComponent
            },
            {
                path: "app-supplier",
                component: SupplierComponent
            },
            {
                path: "app-item",
                component: ItemComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }
