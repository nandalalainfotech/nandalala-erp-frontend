import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BillingRoutingModule } from './billing-routing.module';
import { AccountsReceivableComponent } from './accounts-receivable/accounts-receivable.component';
import { DeliveredItemsComponent } from './delivered-items/delivered-items.component';
import { GrossProfitComponent } from './gross-profit/gross-profit.component';
import { OrderBillComponent } from './order-bill/order-bill.component';
import { AccountsPayableComponent } from './accounts-payable/accounts-payable.component';
import { AccountspaySummaryComponent } from './accountspay-summary/accountspay-summary.component';
import { ReceivedItemsComponent } from './received-items/received-items.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ItemwisePurchaseComponent } from './itemwise-purchase/itemwise-purchase.component';
import { AccountsrecSummaryComponent } from './accountsrec-summary/accountsrec-summary.component';
import { PaymentRequestComponent } from './payment-request/payment-request.component';
import { PaymentEntryComponent } from './payment-entry/payment-entry.component';
import { ItemwisepurchaseComponent } from './itemwisepurchase/itemwisepurchase.component';
import { BillingComponent } from './billing.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AccountsPayableManager } from 'src/app/shared/services/restcontroller/bizservice/accounts-payable.service';
import { DataTablesModule } from 'angular-datatables';
import { AccountsReceivableManager } from 'src/app/shared/services/restcontroller/bizservice/accounts-receivable.service';
import { GrossProfitManager } from 'src/app/shared/services/restcontroller/bizservice/gross-profit.service';
import { ItemWisePurchaseManager } from 'src/app/shared/services/restcontroller/bizservice/itemwisepurchase.service';
import { PayementEntryManager } from 'src/app/shared/services/restcontroller/bizservice/payement-entry.service';
import { PayementRequestManager } from 'src/app/shared/services/restcontroller/bizservice/payement-request.service';
import { CalendarModule } from 'primeng/calendar';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        AccountsReceivableComponent,
        DeliveredItemsComponent,
        GrossProfitComponent,
        OrderBillComponent,
        AccountsPayableComponent,
        AccountspaySummaryComponent,
        ReceivedItemsComponent,
        PurchaseOrderComponent,
        ItemwisePurchaseComponent,
        AccountsrecSummaryComponent,
        PaymentRequestComponent,
        PaymentEntryComponent,
        ItemwisepurchaseComponent,
        BillingComponent
    ],
    imports: [
        CommonModule,
        BillingRoutingModule,
        BreadcrumbModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot(),
        MatTabsModule,
        MatMenuModule,
    ],
    providers: [
        AccountsPayableManager,
        AccountsReceivableManager,
        GrossProfitManager,
        ItemWisePurchaseManager,
        PayementEntryManager,
        PayementRequestManager,
        DatePipe,
        SalesItemManager,

    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BillingModule { }
