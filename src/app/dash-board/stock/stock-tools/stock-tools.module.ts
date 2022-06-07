import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StockToolsRoutingModule } from './stock-tools-routing.module';
import { InstallationNoteComponent } from './installation-note/installation-note.component';
import { StockReconcileComponent } from './stock-reconcile/stock-reconcile.component';
import { PackingSlipComponent } from './packing-slip/packing-slip.component';
import { LandCostVoucherComponent } from './land-cost-voucher/land-cost-voucher.component';
import { StockToolsComponent } from './stock-tools.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { InstallNoteManager } from 'src/app/shared/services/restcontroller/bizservice/tool-installnote.service';
import { LandCostManager } from 'src/app/shared/services/restcontroller/bizservice/tool-landcost.service';
import { StkReconcileManager } from 'src/app/shared/services/restcontroller/bizservice/tool-stk-reconcile.service';
import { PackageSlipManager } from 'src/app/shared/services/restcontroller/bizservice/tool-pkgslip.service';
import { CalendarModule } from 'primeng/calendar';
import { DeliveryNoteManager } from 'src/app/shared/services/restcontroller/bizservice/delivery-note.service';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
    declarations: [
        StockToolsComponent,
        InstallationNoteComponent,
        StockReconcileComponent,
        PackingSlipComponent,
        LandCostVoucherComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        StockToolsRoutingModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot()
    ],
    providers:[
        InstallNoteManager,
        LandCostManager,
        StkReconcileManager,
        PackageSlipManager,
        DeliveryNoteManager,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class StockToolsModule { }
