import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StocksEntrysRoutingModule } from './stocks-entrys-routing.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StocksEntrysComponent } from './stocks-entrys.component';
import { AgGridModule } from 'ag-grid-angular';
import { StocksEntryManager } from 'src/app/shared/services/restcontroller/bizservice/stocks-entry.service';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
    declarations: [
        StocksEntrysComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        StocksEntrysRoutingModule,
        CalendarModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot()
    ],
    providers: [
        StocksEntryManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class StocksEntrysModule { }
