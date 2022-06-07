import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherReportRoutingModule } from './other-report-routing.module';
import { OtherReportComponent } from './other-report.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { OrderItemBilledComponent } from './order-item-billed/order-item-billed.component';
import { BillOfMaterialComponent } from './bill-of-material/bill-of-material.component';
import { AvailableStockComponent } from './available-stock/available-stock.component';
import { CustomerCreditBalanceComponent } from './customer-credit-balance/customer-credit-balance.component';
import { LeadDetailComponent } from './lead-detail/lead-detail.component';
import { SalesPersonComponent } from './sales-person/sales-person.component';
import { ItemWiseComponent } from './item-wise/item-wise.component';
import { PendingItemComponent } from './pending-item/pending-item.component';
import { InactiveCustomerComponent } from './inactive-customer/inactive-customer.component';
import { AgGridModule } from 'ag-grid-angular';
import { LeadDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/lead-detail.service';
import { CustomerDetailManager } from 'src/app/shared/services/restcontroller/bizservice/customer-detail.service';
import { MaterialManager } from 'src/app/shared/services/restcontroller/bizservice/material.service';
import { CustomerBalanceManager } from 'src/app/shared/services/restcontroller/bizservice/customer-credit-balance.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        OtherReportComponent,
        CustomerDetailComponent,
        OrderItemBilledComponent,
        BillOfMaterialComponent,
        AvailableStockComponent,
        CustomerCreditBalanceComponent,
        LeadDetailComponent,
        SalesPersonComponent,
        ItemWiseComponent,
        PendingItemComponent,
        InactiveCustomerComponent
    ],
    imports: [
        CommonModule,
        OtherReportRoutingModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot(),
        MatTabsModule,
        MatMenuModule
    ],
    providers: [
        LeadDetailsManager,
        CustomerDetailManager,
        MaterialManager,
        CustomerBalanceManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class OtherReportModule { }
