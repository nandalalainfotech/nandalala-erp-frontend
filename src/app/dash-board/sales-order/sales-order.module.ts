import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesOrderRoutingModule } from './sales-order-routing.module';
import { SalesOrderComponent } from './sales-order.component';
import { MinutesFirstResponseComponent } from './minutes-first-response/minutes-first-response.component';
import { SupportAnalyticsComponent } from './support-analytics/support-analytics.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
    declarations: [ 
        SalesOrderComponent,
        MinutesFirstResponseComponent,
        SupportAnalyticsComponent
    ],
    imports: [
        CommonModule,
        SalesOrderRoutingModule,
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([])
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SalesOrderModule { }
