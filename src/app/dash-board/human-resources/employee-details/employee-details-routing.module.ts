import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeDetailsComponent } from './employee-details.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
    {
        path: "",
        component: EmployeeDetailsComponent,
        children: [
            {
                path: "app-employee",
                component: EmployeeComponent
            },
            {
                path: "app-department",
                component: DepartmentComponent
            },
            {
                path: "app-attendance",
                component: AttendanceComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeDetailsRoutingModule { }
