import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SalseRoutingModule } from './salse-routing.module';
import { QuotTrendsComponent } from './quot-trends/quot-trends.component';
import { SalseOrderComponent } from './salse-order/salse-order.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { SalseComponent } from './salse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SalseOrderManager } from 'src/app/shared/services/restcontroller/bizservice/salse-order.service';
import { CalendarModule } from 'primeng/calendar';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        SalseComponent,
        QuotTrendsComponent,
        SalseOrderComponent
    ],
    imports: [
        CommonModule,
        SalseRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        MatTabsModule
    ],

    providers: [
        SalseOrderManager,
        DatePipe,
        SalesItemManager

    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SalseModule { }
