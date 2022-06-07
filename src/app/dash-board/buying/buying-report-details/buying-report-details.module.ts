import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BuyingReportDetailsRoutingModule } from './buying-report-details-routing.module';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { ItemRequestComponent } from './item-request/item-request.component';
import { ItemOrderedComponent } from './item-ordered/item-ordered.component';
import { MatreqSupwiseComponent } from './matreq-supwise/matreq-supwise.component';
import { ItemPuhistoryComponent } from './item-puhistory/item-puhistory.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuyingReportDetailsComponent } from './buying-report-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ItemOrderedManager } from 'src/app/shared/services/restcontroller/bizservice/item-ordered.service';
import { ItemPuhistoryManager } from 'src/app/shared/services/restcontroller/bizservice/item-puhistory.service';
import { ItemRequestManager } from 'src/app/shared/services/restcontroller/bizservice/item-request.service';
import { MatreqSupwiseManager } from 'src/app/shared/services/restcontroller/bizservice/matreq-supwise.service';
import { CalendarModule } from 'primeng/calendar';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        BuyingReportDetailsComponent,
        ItemRequestComponent,
        ItemOrderedComponent,
        MatreqSupwiseComponent,
        ItemPuhistoryComponent

    ],
    imports: [
        CommonModule,
        BuyingReportDetailsRoutingModule,
        BreadcrumbModule,
        FormsModule,
        CalendarModule,
        ReactiveFormsModule, 
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
       ItemOrderedManager,
       ItemPuhistoryManager,
       ItemRequestManager,
       MatreqSupwiseManager,
       DatePipe,
       SalesItemManager

    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BuyingReportDetailsModule { }
