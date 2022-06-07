import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetAccountComponent } from './budget-account/budget-account.component';
import { BudgetCostcenterComponent } from './budget-costcenter.component';
import { BudgetMonthdistComponent } from './budget-monthdist/budget-monthdist.component';
import { BudgetVariancerepComponent } from './budget-variancerep/budget-variancerep.component';
import { BudgetComponent } from './budget/budget.component';
import { CostcenterComponent } from './costcenter/costcenter.component';

const routes: Routes = [
    {
        path: "",
        component: BudgetCostcenterComponent,
        children: [
            {
                path: "app-costcenter",
                component: CostcenterComponent
            },
            {
                path: "app-budget",
                component: BudgetComponent
            },
            {
                path: "app-budget-account",
                component: BudgetAccountComponent
            },
            {
                path: "app-budget-monthdist",
                component: BudgetMonthdistComponent
            },
            {
                path: "app-budget-variancerep",
                component: BudgetVariancerepComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BudgetCostcenterRoutingModule { }
