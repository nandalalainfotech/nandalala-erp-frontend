import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetVarainceReportComponent } from './budget-varaince-report.component';

const routes: Routes = [
    {
        path: '',
        component: BudgetVarainceReportComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BudgetVarainceReportRoutingModule { }
