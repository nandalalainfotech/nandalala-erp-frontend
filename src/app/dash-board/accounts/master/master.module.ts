import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { AssetComponent } from './asset/asset.component';
import { CustomerComponent } from './customer/customer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ItemComponent } from './item/item.component';
import { MasterComponent } from './master.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AssetManager } from 'src/app/shared/services/restcontroller/bizservice/asset.service';
import { CustomerManager } from 'src/app/shared/services/restcontroller/bizservice/customer.service';
import { SupplierManager } from 'src/app/shared/services/restcontroller/bizservice/supplier.service';
import { CalendarModule } from 'primeng/calendar';
import { ItemManager } from 'src/app/shared/services/restcontroller/bizservice/item.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        AssetComponent,
        CustomerComponent,
        SupplierComponent,
        ItemComponent,
        MasterComponent
    ],
    imports: [
        CommonModule,
        MasterRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        AssetManager,
        CustomerManager,
        SupplierManager,
        DatePipe,
        ItemManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MasterModule { }
