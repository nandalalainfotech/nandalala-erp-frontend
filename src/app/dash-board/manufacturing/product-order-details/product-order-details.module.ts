import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ProdOrderManager } from 'src/app/shared/services/restcontroller/bizservice/prod-order.service';
import { ProdPlanManager } from 'src/app/shared/services/restcontroller/bizservice/prod-plan.service';
import { ProdStockManager } from 'src/app/shared/services/restcontroller/bizservice/prod-stock.service';
import { ProdTimeManager } from 'src/app/shared/services/restcontroller/bizservice/prod-time.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { ProdOrderComponent } from './prod-order/prod-order.component';
import { ProductOrderDetailsRoutingModule } from './product-order-details-routing.module';
import { ProductOrderDetailsComponent } from './product-order-details.component';
import { ProductPlanComponent } from './product-plan/product-plan.component';
import { ProductStockComponent } from './product-stock/product-stock.component';
import { ProductTimestComponent } from './product-timest/product-timest.component';



@NgModule({
    declarations: [
        ProdOrderComponent,
        ProductPlanComponent,
        ProductStockComponent,
        ProductTimestComponent,
        ProductOrderDetailsComponent,
        
    ],
    imports: [
        CommonModule,
        ProductOrderDetailsRoutingModule,
        BreadcrumbModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        ProdOrderManager,
        ProdPlanManager,
        ProdStockManager,
        ProdTimeManager,
        SalesItemManager
    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    entryComponents: [AuditComponent],
    // bootstrap: [AuditComponent],
})
export class ProductOrderDetailsModule { }
