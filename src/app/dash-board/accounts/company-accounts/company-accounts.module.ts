import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CompanyAccountsRoutingModule } from './company-accounts-routing.module';
import { GeneralLedgerComponent } from './general-ledger/general-ledger.component';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';
import { AccountChartComponent } from './account-chart/account-chart.component';
import { ComAccountComponent } from './com-account/com-account.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { CompanyAccountsComponent } from './company-accounts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { DataTablesModule } from 'angular-datatables';
import { AccountChartManager } from 'src/app/shared/services/restcontroller/bizservice/account-chart.service';
import { ComAccountManager } from 'src/app/shared/services/restcontroller/bizservice/com-account.service';
import { GeneralLedgerManager } from 'src/app/shared/services/restcontroller/bizservice/general-ledger.service';
import { JournalEntryManager } from 'src/app/shared/services/restcontroller/bizservice/journal-entry.service';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        GeneralLedgerComponent,
        JournalEntryComponent,
        AccountChartComponent,
        ComAccountComponent,
        CompanyAccountsComponent

    ],
    imports: [
        CommonModule,
        CompanyAccountsRoutingModule,
        BreadcrumbModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        AccountChartManager,
        ComAccountManager,
        GeneralLedgerManager,
        JournalEntryManager,
        DatePipe

    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class CompanyAccountsModule { }
