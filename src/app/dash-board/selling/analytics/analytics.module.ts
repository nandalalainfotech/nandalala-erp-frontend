import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { SalesAnalyticsComponent } from './sales-analytics/sales-analytics.component';
import { SalesFunnelComponent } from './sales-funnel/sales-funnel.component';
import { CustomerAcqustionLoyaltyComponent } from './customer-acqustion-loyalty/customer-acqustion-loyalty.component';
import { QuotationTrendsComponent } from './quotation-trends/quotation-trends.component';
import { SalesOrderTrendsComponent } from './sales-order-trends/sales-order-trends.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { AnalyticsComponent } from './analytics.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CustomerLoyaltyManager } from 'src/app/shared/services/restcontroller/bizservice/customer-acqustion-loyalty.service';
import { SalseOrderManager } from 'src/app/shared/services/restcontroller/bizservice/salse-order.service';
import { CalendarModule } from 'primeng/calendar';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        AnalyticsComponent,
        SalesAnalyticsComponent,
        SalesFunnelComponent,
        CustomerAcqustionLoyaltyComponent,
        QuotationTrendsComponent,
        SalesOrderTrendsComponent
    ],
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot(),
        MatTabsModule
        
    ],
    providers: [
        CustomerLoyaltyManager,
        SalseOrderManager,
        SalesItemManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class AnalyticsModule { }
