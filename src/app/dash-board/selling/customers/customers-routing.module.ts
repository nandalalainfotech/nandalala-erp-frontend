import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from '../../accounts/master/customer/customer.component';
import { AddressComponent } from './address/address.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerGroupComponent } from './customer-group/customer-group.component';
import { CustomerrComponent } from './customerr/customerr.component';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
    {
        path: "",
        component: CustomersComponent,
        children: [
            {
                path: "app-customer-group",
                component: CustomerGroupComponent
            },
            {
                path: "app-customerr",
                component: CustomerrComponent
            },
            {
                path: "app-contact",
                component: ContactComponent
            },
            {
                path: "app-address",
                component: AddressComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersRoutingModule { }
