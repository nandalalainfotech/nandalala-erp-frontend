import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerReportsRoutingModule } from './customer-reports-routing.module';
import { CustomerDtComponent } from './customer-dt/customer-dt.component';
import { CustomerReportsComponent } from './customer-reports.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CustomerManager } from 'src/app/shared/services/restcontroller/bizservice/customer.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [CustomerReportsComponent, CustomerDtComponent],
    imports: [
        CommonModule,
        CustomerReportsRoutingModule,
        BreadcrumbModule,
        FormsModule, ReactiveFormsModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers:[CustomerManager],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CustomerReportsModule { }
