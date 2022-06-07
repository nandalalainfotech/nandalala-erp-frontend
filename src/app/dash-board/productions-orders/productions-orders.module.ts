import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionsOrdersRoutingModule } from './productions-orders-routing.module';
import { ProductionsOrdersComponent } from './productions-orders.component';
import { ProductionOrdersComponent } from './production-orders/production-orders.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProdOrderManager } from 'src/app/shared/services/restcontroller/bizservice/prod-order.service';


@NgModule({
    declarations: [
        ProductionsOrdersComponent,
        ProductionOrdersComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        ProductionsOrdersRoutingModule,
        AgGridModule.withComponents([])
    ],
    providers: [
        ProdOrderManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class ProductionsOrdersModule { }
