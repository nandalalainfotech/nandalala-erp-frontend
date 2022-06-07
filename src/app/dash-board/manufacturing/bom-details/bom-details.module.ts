import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BomDetailsRoutingModule } from './bom-details-routing.module';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { BomDetailsComponent } from './bom-details.component';
import { MaterialComponent } from './material/material.component';
import { ItemStatusComponent } from './item-status/item-status.component';
import { WorkStationComponent } from './work-station/work-station.component';
import { OperationComponent } from './operation/operation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ItemStatusManager } from 'src/app/shared/services/restcontroller/bizservice/item-status.service';
import { WorkStationManager } from 'src/app/shared/services/restcontroller/bizservice/work-station.service';
import { OperationManager } from 'src/app/shared/services/restcontroller/bizservice/operation.service';
import { MaterialManager } from 'src/app/shared/services/restcontroller/bizservice/material.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
    declarations: [
        BomDetailsComponent,
        MaterialComponent,
        ItemStatusComponent,
        WorkStationComponent,
        OperationComponent
    ],
    imports: [
        CommonModule,
        BomDetailsRoutingModule,
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot(),
    ],
    providers: [
        ItemStatusManager,
        WorkStationManager,
        OperationManager,
        MaterialManager,
        SalesItemManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BomDetailsModule { }
