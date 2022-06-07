import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerAcLoComponent } from './customer-ac-lo/customer-ac-lo.component';
import { CustomerCrtBalComponent } from './customer-crt-bal/customer-crt-bal.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
    {
        path: "",
        component: CustomerComponent,
        children: [
            {
                path: 'app-customer-ac-lo',
                component: CustomerAcLoComponent
            },
            {
                path: 'app-customer-details',
                component: CustomerDetailsComponent
            },
            {
                path: 'app-customer-crt-bal',
                component: CustomerCrtBalComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
