import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HumanResourcesComponent } from './human-resources.component';


const routes: Routes = [
    {
        path: "",
        component: HumanResourcesComponent,
        children: [
            {
                path: "app-employee-details",
                loadChildren: () => import("./employee-details/employee-details.module").then(m => m.EmployeeDetailsModule)
            },
            {
                path: "app-leave-details",
                loadChildren: () => import("./leave-details/leave-details.module").then(m => m.LeaveDetailsModule)
            },
            {
                path: 'app-employee-report-details',
                loadChildren: () => import("./employee-report-details/employee-report-details.module").then(m => m.EmployeeReportDetailsModule)
            },
            {
                path: "app-pay-roll",
                loadChildren: () => import("./pay-roll/pay-roll.module").then(m => m.PayRollModule)
            },
            {
                path: "app-expense-claim",
                loadChildren: () => import("./expense-claim/expense-claim.module").then(m => m.ExpenseClaimModule)
            },
            {
                path: "app-appraisals",
                loadChildren: () => import("./appraisals/appraisals.module").then(m => m.AppraisalsModule)
            },
            {
                path: "app-human-setup",
                loadChildren: () => import("./human-setup/human-setup.module").then(m => m.HumanSetupModule)
            },
            {
                path: "app-recruitment",
                loadChildren: () => import("./recruitment/recruitment.module").then(m => m.RecruitmentModule)
            },
            {
                path: "app-human-help",
                loadChildren: () => import("./human-help/human-help.module").then(m => m.HumanHelpModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HumanResourcesRoutingModule { }
