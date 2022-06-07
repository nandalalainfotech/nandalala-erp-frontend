import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerAcLoComponent } from './customer-ac-lo/customer-ac-lo.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerCrtBalComponent } from './customer-crt-bal/customer-crt-bal.component';
import { CustomerComponent } from './customer.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CustomerLoyaltyManager } from 'src/app/shared/services/restcontroller/bizservice/customer-acqustion-loyalty.service';
import { CustomerDetailManager } from 'src/app/shared/services/restcontroller/bizservice/customer-detail.service';
import { CustomerBalanceManager } from 'src/app/shared/services/restcontroller/bizservice/customer-credit-balance.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        CustomerComponent,
        CustomerAcLoComponent,
        CustomerDetailsComponent,
        CustomerCrtBalComponent
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        CustomerLoyaltyManager,
        CustomerDetailManager,
        CustomerBalanceManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CustomerModule { }
