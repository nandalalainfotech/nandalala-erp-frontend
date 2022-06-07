import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { SupplierWiseAnalyticsComponent } from './supplier-wise-analytics/supplier-wise-analytics.component';
import { OrderTrendComponent } from './order-trend/order-trend.component';
import { PuAnalyticsComponent } from './pu-analytics/pu-analytics.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { AnalyticsComponent } from './analytics.component';
import { AgGridModule } from 'ag-grid-angular';
import { PuAnalyticsManager } from 'src/app/shared/services/restcontroller/bizservice/pu-analytics.service';
import { SupplierWiseAnalyticsManager } from 'src/app/shared/services/restcontroller/bizservice/supplier-wise-analytics.service';
import { CalendarModule } from 'primeng/calendar';
import { OrderTrendManager } from 'src/app/shared/services/restcontroller/bizservice/order-trend.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
    declarations: [
        AnalyticsComponent,
        PuAnalyticsComponent,
        SupplierWiseAnalyticsComponent,
        OrderTrendComponent
    ],
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot()
    ],
    providers: [
        PuAnalyticsManager,
        SupplierWiseAnalyticsManager,
        DatePipe,
        OrderTrendManager,
        SalesItemManager

    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class AnalyticsModule { }
