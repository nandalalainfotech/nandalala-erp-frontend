import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StockReportsDetailsRoutingModule } from './stock-reports-details-routing.module';
import { OrdItmDeliverComponent } from './ord-itm-deliver/ord-itm-deliver.component';
import { PurItmOrderComponent } from './pur-itm-order/pur-itm-order.component';
import { ItmShortageComponent } from './itm-shortage/itm-shortage.component';
import { ReqItmTransferComponent } from './req-itm-transfer/req-itm-transfer.component';
import { ItmPriceReportComponent } from './itm-price-report/itm-price-report.component';
import { ItmWiseLevelComponent } from './itm-wise-level/itm-wise-level.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { StockReportsDetailsComponent } from './stock-reports-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ItemPriceReportManager } from 'src/app/shared/services/restcontroller/bizservice/item-price-report.service';
import { ItemShortageManager } from 'src/app/shared/services/restcontroller/bizservice/item-shortage.service';
import { ItemWiseLevelManager } from 'src/app/shared/services/restcontroller/bizservice/item-wise-level.service';
import { OrderItemDeliverManager } from 'src/app/shared/services/restcontroller/bizservice/order-item-deliver.service';
import { PurchaseItemOrderManager } from 'src/app/shared/services/restcontroller/bizservice/purchase-item-order.service';
import { RequestItemTransferManager } from 'src/app/shared/services/restcontroller/bizservice/request-item-transfer.service';
import { CalendarModule } from 'primeng/calendar';
import { ProjecttManager } from 'src/app/shared/services/restcontroller/bizservice/projectt.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { WareHouseManager } from 'src/app/shared/services/restcontroller/bizservice/ware-house.service';
import { ProjectQuantityManager } from 'src/app/shared/services/restcontroller/bizservice/projected-quantity.service';
import { MatreqSupwiseManager } from 'src/app/shared/services/restcontroller/bizservice/matreq-supwise.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        StockReportsDetailsComponent,
        OrdItmDeliverComponent,
        PurItmOrderComponent,
        ItmShortageComponent,
        ReqItmTransferComponent,
        ItmPriceReportComponent,
        ItmWiseLevelComponent
    ],
    imports: [
        CommonModule,
        StockReportsDetailsRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        ItemPriceReportManager,
        ItemShortageManager,
        ItemWiseLevelManager,
        OrderItemDeliverManager,
        PurchaseItemOrderManager,
        RequestItemTransferManager,
        ProjecttManager,
        SalesItemManager,
        WareHouseManager,
        ProjectQuantityManager,
        MatreqSupwiseManager,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class StockReportsDetailsModule { }