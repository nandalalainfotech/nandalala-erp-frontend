import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SalesPipelineRoutingModule } from './sales-pipeline-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { SalesPipelineComponent } from './sales-pipeline.component';
import { CRMSalesPipeLineComponent } from './crm-sales-pipe-line/crm-sales-pipe-line.component';
import { CRMContactComponent } from './crm-contact/crm-contact.component';
import { AgGridModule } from 'ag-grid-angular';
import { CrmSalesPipelineManager } from 'src/app/shared/services/restcontroller/bizservice/crm-sales-pipeline.service';
import { CrmContactManager } from 'src/app/shared/services/restcontroller/bizservice/crm-contact.service';
import { CrmSalesCustomerManager } from 'src/app/shared/services/restcontroller/bizservice/crm-sales-customer.service';
import { CrmOpportunityManager } from 'src/app/shared/services/restcontroller/bizservice/crm-opportunity.service';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
    declarations: [
        SalesPipelineComponent,
        CustomerComponent,
        OpportunityComponent,
        CRMSalesPipeLineComponent,
        CRMContactComponent
    ],
    imports: [
        CommonModule,
        SalesPipelineRoutingModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule
    ],
    providers: [
        CrmSalesPipelineManager,
        CrmContactManager,
        CrmSalesCustomerManager,
        CrmOpportunityManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SalesPipelineModule { }
