import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PurchaseDetailsRoutingModule } from './purchase-details-routing.module';
import { PrmatReqComponent } from './prmat-req/prmat-req.component';
import { PrreqQuotComponent } from './prreq-quot/prreq-quot.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { SupplierQuotComponent } from './supplier-quot/supplier-quot.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { PurchaseDetailsComponent } from './purchase-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PrmatReqManager } from 'src/app/shared/services/restcontroller/bizservice/prmat-req.service';
import { PrreqQuotReqManager } from 'src/app/shared/services/restcontroller/bizservice/prreq-quot.service';
import { PurchaseOrdersManager } from 'src/app/shared/services/restcontroller/bizservice/purchase-orders.service';
import { SupplierQuotManager } from 'src/app/shared/services/restcontroller/bizservice/supplier-quot.service';
import { CalendarModule } from 'primeng/calendar';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
    declarations: [
        PrmatReqComponent,
        PrreqQuotComponent,
        PurchaseOrderComponent,
        SupplierQuotComponent,
        PurchaseDetailsComponent
    ],
    imports: [
        CommonModule,
        PurchaseDetailsRoutingModule,
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
        PrmatReqManager,
        PrreqQuotReqManager,
        PurchaseOrdersManager,
        SupplierQuotManager,
        DatePipe,
        SalesItemManager    

    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PurchaseDetailsModule { }
