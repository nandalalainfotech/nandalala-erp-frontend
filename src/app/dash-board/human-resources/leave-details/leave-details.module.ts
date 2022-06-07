import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LeaveDetailsRoutingModule } from './leave-details-routing.module';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { LeaveBlockComponent } from './leave-block/leave-block.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveDetailsComponent } from './leave-details.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HolidayListManager } from 'src/app/shared/services/restcontroller/bizservice/holiday-list.service';
import { LeaveApplicationManager } from 'src/app/shared/services/restcontroller/bizservice/leave-application.service';
import { LeaveBlockManager } from 'src/app/shared/services/restcontroller/bizservice/leave-block.service';
import { LeaveTypeManager } from 'src/app/shared/services/restcontroller/bizservice/leave-type.service';
import { CalendarModule } from 'primeng/calendar';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        LeaveApplicationComponent,
        LeaveTypeComponent,
        HolidayListComponent,
        LeaveBlockComponent,
        LeaveDetailsComponent
    ],
    imports: [
        CommonModule,
        LeaveDetailsRoutingModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        BreadcrumbModule, AgGridModule.withComponents([]),
        CalendarModule,
        MatTabsModule
    ],
    providers:[
        HolidayListManager,
        LeaveApplicationManager,
        LeaveBlockManager,
        LeaveTypeManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class LeaveDetailsModule { }
