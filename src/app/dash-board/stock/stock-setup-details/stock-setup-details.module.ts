import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockSetupDetailsRoutingModule } from './stock-setup-details-routing.module';
import { StkSettingComponent } from './stk-setting/stk-setting.component';
import { WareHouseComponent } from './ware-house/ware-house.component';
import { UnitOfMeasureComponent } from './unit-of-measure/unit-of-measure.component';
import { BrandComponent } from './brand/brand.component';
import { StockSetupDetailsComponent } from './stock-setup-details.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StockSettingManager } from 'src/app/shared/services/restcontroller/bizservice/stk-setting.service';
import { BrandManager } from 'src/app/shared/services/restcontroller/bizservice/brand.service';
import { UnitofMeaseureManager } from 'src/app/shared/services/restcontroller/bizservice/unit-of-measure.service';
import { WareHouseManager } from 'src/app/shared/services/restcontroller/bizservice/ware-house.service';
import { StockLedgerManager } from 'src/app/shared/services/restcontroller/bizservice/stock-ledger.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        StockSetupDetailsComponent,
        StkSettingComponent,
        WareHouseComponent,
        UnitOfMeasureComponent,
        BrandComponent
    ],

    imports: [
        CommonModule,
        StockSetupDetailsRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
     providers: [
        StockSettingManager,
        BrandManager,
        UnitofMeaseureManager,
        StockLedgerManager,
        WareHouseManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class StockSetupDetailsModule { }