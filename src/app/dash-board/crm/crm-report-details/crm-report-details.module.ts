import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CrmReportDetailsRoutingModule } from './crm-report-details-routing.module';
import { MiniTimeResComponent } from './mini-time-res/mini-time-res.component';
import { InactiveCustomersComponent } from './inactive-customers/inactive-customers.component';
import { CustomersComponent } from './customers/customers.component';
import { CrmReportDetailsComponent } from './crm-report-details.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrmLeadDetailsComponent } from './crm-lead-details/crm-lead-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LeadDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/crm-lead-det.service';
import { CustomerManager } from 'src/app/shared/services/restcontroller/bizservice/customer.service';
import { InactiveCustomerManager } from 'src/app/shared/services/restcontroller/bizservice/crm-rep-inactivecust.service';
import { MiniTimeresManager } from 'src/app/shared/services/restcontroller/bizservice/crm-rep-minitimeres.service';
import { CalendarModule } from 'primeng/calendar';
import { CrmTerritoryManager } from 'src/app/shared/services/restcontroller/bizservice/crm-territory.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        MiniTimeResComponent,
        InactiveCustomersComponent,
        CustomersComponent,
        CrmReportDetailsComponent,
        CrmLeadDetailsComponent

    ],
    imports: [
        CommonModule,
        CrmReportDetailsRoutingModule,
        BreadcrumbModule,
        DataTablesModule,
        FormsModule,
        CalendarModule,
        ReactiveFormsModule, 
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers:[
        LeadDetailsManager,
        CustomerManager,
        InactiveCustomerManager,
        MiniTimeresManager,
        CrmTerritoryManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]



})
export class CrmReportDetailsModule { }
