import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ItemComponent } from './item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { AgGridModule } from 'ag-grid-angular';
import { SalseOrderManager } from 'src/app/shared/services/restcontroller/bizservice/salse-order.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { OrderDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/order-details.service';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        ItemComponent,
        SalesOrderComponent,
        ItemDetailsComponent,
        OrderDetailsComponent
    ],
    imports: [
        CommonModule,
        ItemRoutingModule, BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        SalseOrderManager,
        SalesItemManager,
        OrderDetailsManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ItemModule { }
