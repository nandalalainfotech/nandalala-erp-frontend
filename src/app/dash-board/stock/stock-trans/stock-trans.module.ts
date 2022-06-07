import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StockTransRoutingModule } from './stock-trans-routing.module';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { PurchaseReceiptComponent } from './purchase-receipt/purchase-receipt.component';
import { MaterialReqComponent } from './material-req/material-req.component';
import { DeliveryNoteComponent } from './delivery-note/delivery-note.component';
import { StockTransComponent } from './stock-trans.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { StockEntryManager } from 'src/app/shared/services/restcontroller/bizservice/stock-entry.service';
import { DeliveryNoteManager } from 'src/app/shared/services/restcontroller/bizservice/delivery-note.service';
import { PurchaseReceiptManager } from 'src/app/shared/services/restcontroller/bizservice/purchase-receipt.service';
import { PrmatReqManager } from 'src/app/shared/services/restcontroller/bizservice/prmat-req.service';
import { CalendarModule } from 'primeng/calendar';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        StockTransComponent,
        StockEntryComponent,
        PurchaseReceiptComponent,
        MaterialReqComponent,
        DeliveryNoteComponent
    ],
    imports: [
        CommonModule,
        StockTransRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        StockEntryManager,
        DeliveryNoteManager,
        PurchaseReceiptManager,
        PrmatReqManager,
        SalesItemManager,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class StockTransModule { }
