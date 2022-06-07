import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AgGridModule } from 'ag-grid-angular';
import { buySuppliersManager } from 'src/app/shared/services/restcontroller/bizservice/buyingsupplies.service';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
    declarations: [
        SupplierComponent
    ],
    imports: [
        CommonModule,
        SupplierRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot()
    ],
    providers: [
        buySuppliersManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SupplierModule { }
