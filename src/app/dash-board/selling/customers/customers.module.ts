import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerGroupComponent } from './customer-group/customer-group.component';
import { ContactComponent } from './contact/contact.component';
import { AddressComponent } from './address/address.component';
import { CustomersComponent } from './customers.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { CustomerrComponent } from './customerr/customerr.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        CustomersComponent,
        CustomerGroupComponent,
        CustomerrComponent,
        ContactComponent,
        AddressComponent
    ],
    imports: [
        CommonModule,
        CustomersRoutingModule,
        BreadcrumbModule,
        AgGridModule.withComponents([]),
        MatTabsModule
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CustomersModule { }
