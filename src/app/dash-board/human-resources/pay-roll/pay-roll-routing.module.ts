import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayRollComponent } from './pay-roll.component';
import { PayRollsComponent } from './pay-rolls/pay-rolls.component';
import { ProcessPayrollComponent } from './process-payroll/process-payroll.component';
import { SalaryComponentComponent } from './salary-component/salary-component.component';
import { SalaryStructureComponent } from './salary-structure/salary-structure.component';

const routes: Routes = [
    {
        path: "",
        component: PayRollComponent,
        children: [
            {
                path: "app-pay-rolls",
                component: PayRollsComponent,
            },
            {
                path: "app-process-payroll",
                component: ProcessPayrollComponent,
            },
            {
                path: "app-salary-structure",
                component: SalaryStructureComponent,
            },
            {
                path: "app-salary-component",
                component: SalaryComponentComponent,
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PayRollRoutingModule { }
