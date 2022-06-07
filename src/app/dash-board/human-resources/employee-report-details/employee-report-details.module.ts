import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EmployeeReportDetailsRoutingModule } from './employee-report-details-routing.module';
import { EmpBirthdayComponent } from './emp-birthday/emp-birthday.component';
import { EmpLeaveBalanceComponent } from './emp-leave-balance/emp-leave-balance.component';
import { EmpHolidayWorkComponent } from './emp-holiday-work/emp-holiday-work.component';
import { EmpSalesRegisterComponent } from './emp-sales-register/emp-sales-register.component';
import { MonthAttendSheetComponent } from './month-attend-sheet/month-attend-sheet.component';
import { EmployeeReportDetailsComponent } from './employee-report-details.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EmployeeBirthManager } from 'src/app/shared/services/restcontroller/bizservice/emp-birthday.service';
import { EmployeeHolidayWorkManager } from 'src/app/shared/services/restcontroller/bizservice/emp-holiday-work.service';
import { EmployeeLeaveBalanceManager } from 'src/app/shared/services/restcontroller/bizservice/emp-leave-balance.service';
import { EmployeeSalesRegisterManager } from 'src/app/shared/services/restcontroller/bizservice/emp-sales-register.service';
import { MonthAttendSheetManager } from 'src/app/shared/services/restcontroller/bizservice/month-attend-sheet.service';
import { EmployeeManager } from 'src/app/shared/services/restcontroller/bizservice/employee.service';
import { EmpInformationComponent } from './emp-information/emp-information.component';
import { CalendarModule } from 'primeng/calendar';
import { EmpDeptmentManager } from 'src/app/shared/services/restcontroller/bizservice/emp-deptment.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        EmployeeReportDetailsComponent,
        EmpLeaveBalanceComponent,
        EmpBirthdayComponent,
        EmpHolidayWorkComponent,
        EmpSalesRegisterComponent,
        MonthAttendSheetComponent,
        EmpInformationComponent
    
    ],

    imports: [
        CommonModule,
        EmployeeReportDetailsRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule, 
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        EmployeeBirthManager,
        EmployeeHolidayWorkManager,
        EmployeeLeaveBalanceManager,
        EmployeeSalesRegisterManager,
        MonthAttendSheetManager,
        EmployeeManager,
        DatePipe,
        EmpDeptmentManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})

export class EmployeeReportDetailsModule { }