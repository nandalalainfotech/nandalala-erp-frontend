import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpBirthdayComponent } from './emp-birthday/emp-birthday.component';
import { EmpHolidayWorkComponent } from './emp-holiday-work/emp-holiday-work.component';
import { EmpInformationComponent } from './emp-information/emp-information.component';
import { EmpLeaveBalanceComponent } from './emp-leave-balance/emp-leave-balance.component';
import { EmpSalesRegisterComponent } from './emp-sales-register/emp-sales-register.component';
import { EmployeeReportDetailsComponent } from './employee-report-details.component';
import { MonthAttendSheetComponent } from './month-attend-sheet/month-attend-sheet.component';

const routes: Routes = [
    {
        path: '',
        component: EmployeeReportDetailsComponent,
        children: [
            {
                path: 'app-emp-leave-balance',
                component: EmpLeaveBalanceComponent
            },
            {
                path: 'app-emp-birthday',
                component: EmpBirthdayComponent
            },
            {
                path: 'app-emp-holiday-work',
                component: EmpHolidayWorkComponent
            },
            {
                path: 'app-emp-sales-register',
                component: EmpSalesRegisterComponent
            },
            {
                path: 'app-month-attend-sheet',
                component: MonthAttendSheetComponent
            },
            {
                path: 'app-emp-information',
                component: EmpInformationComponent
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EmployeeReportDetailsRoutingModule { }