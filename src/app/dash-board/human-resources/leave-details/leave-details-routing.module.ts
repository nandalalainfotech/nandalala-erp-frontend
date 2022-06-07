import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { LeaveBlockComponent } from './leave-block/leave-block.component';
import { LeaveDetailsComponent } from './leave-details.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';

const routes: Routes = [
    {
        path: "",
        component: LeaveDetailsComponent,
        children: [
            {
                path: "app-holiday-list",
                component: HolidayListComponent
            },
            {
                path: "app-leave-application",
                component: LeaveApplicationComponent
            },
            {
                path: "app-leave-block",
                component: LeaveBlockComponent
            },
            {
                path: "app-leave-type",
                component: LeaveTypeComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LeaveDetailsRoutingModule { }
