import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { SupportAnalyticsComponent } from './support-analytics/support-analytics.component';
import { MinutesResponseIssuesComponent } from './minutes-response-issues/minutes-response-issues.component';
import { ReportsComponent } from './reports.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { AgGridModule } from 'ag-grid-angular';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        ReportsComponent,
        SupportAnalyticsComponent,
        MinutesResponseIssuesComponent
    ],
    imports: [
        CommonModule,
        ReportsRoutingModule,
        BreadcrumbModule,
        AgGridModule.withComponents([]),
        MatTabsModule
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class ReportsModule { }
