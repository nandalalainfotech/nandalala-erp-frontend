import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointOfSaleRoutingModule } from './point-of-sale-routing.module';
import { PosComponent } from './pos/pos.component';
import { PointOfSaleComponent } from './point-of-sale.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
@NgModule({
    declarations: [
        PointOfSaleComponent,
        PosComponent
    ],
    imports: [
        CommonModule,
        PointOfSaleRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule, AgGridModule.withComponents([])
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class PointOfSaleModule { }
