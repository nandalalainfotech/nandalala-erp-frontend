import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { NgxMaskModule } from 'ngx-mask';
import { CalendarModule } from 'primeng/calendar';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { BomTypeManager } from 'src/app/shared/services/restcontroller/bizservice/bom-type.service';
import { CompleteOrderManager } from 'src/app/shared/services/restcontroller/bizservice/complete-order.service';
import { IssueItemManager } from 'src/app/shared/services/restcontroller/bizservice/issue-item.service';
import { OpenOrderManager } from 'src/app/shared/services/restcontroller/bizservice/open-order.service';
import { ProdOrderManager } from 'src/app/shared/services/restcontroller/bizservice/prod-order.service';
import { ProgressOrderManager } from 'src/app/shared/services/restcontroller/bizservice/progress-order.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { BomTypeComponent } from './bom-type/bom-type.component';
import { CompleteOrderComponent } from './complete-order/complete-order.component';
import { IssueItemComponent } from './issue-item/issue-item.component';
import { OpenOrderComponent } from './open-order/open-order.component';
import { ProductReportdetailsRoutingModule } from './product-reportdetails-routing.module';
import { ProductReportdetailsComponent } from './product-reportdetails.component';
import { ProgressOrderComponent } from './progress-order/progress-order.component';

@NgModule({
    declarations: [
        OpenOrderComponent,
        ProgressOrderComponent,
        CompleteOrderComponent,
        BomTypeComponent,
        IssueItemComponent,
        ProductReportdetailsComponent,
        IconRendererComponent

    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        ProductReportdetailsRoutingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot()
    ],
    providers: [
        BomTypeManager,
        CompleteOrderManager,
        IssueItemManager,
        OpenOrderManager,
        ProgressOrderManager,
        DatePipe,
        SalesItemManager,
        ProdOrderManager

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]


})
export class ProductReportdetailsModule { }
