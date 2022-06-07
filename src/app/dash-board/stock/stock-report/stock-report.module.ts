import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StockReportRoutingModule } from './stock-report-routing.module';
import { StockLedgerComponent } from './stock-ledger/stock-ledger.component';
import { StockBalanceComponent } from './stock-balance/stock-balance.component';
import { ProjectedQuantityComponent } from './projected-quantity/projected-quantity.component';
import { StockAgeingComponent } from './stock-ageing/stock-ageing.component';
import { StockReportComponent } from './stock-report.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StockLedgerManager } from 'src/app/shared/services/restcontroller/bizservice/stock-ledger.service';
import { StockBalanceManager } from 'src/app/shared/services/restcontroller/bizservice/stock-balance.service';
import { ProjectQuantityManager } from 'src/app/shared/services/restcontroller/bizservice/projected-quantity.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { StockAgeingManager } from 'src/app/shared/services/restcontroller/bizservice/stock-ageing.service';
import { CalanderComponent } from '../../projects/project/calander/calander.component';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
    declarations: [
        StockReportComponent,
        StockLedgerComponent,
        StockBalanceComponent,
        ProjectedQuantityComponent,
        StockAgeingComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        StockReportRoutingModule,
        CalendarModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot()
    ],
    providers:[
        StockLedgerManager,
        StockBalanceManager,
        ProjectQuantityManager,
        StockAgeingManager,
        SalesItemManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class StockReportModule { }
