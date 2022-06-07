import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotTrendsComponent } from './quot-trends/quot-trends.component';
import { SalseOrderComponent } from './salse-order/salse-order.component';
import { SalseComponent } from './salse.component';

const routes: Routes = [
    {
        path: "",
        component: SalseComponent,
        children: [
            {
                path: "app-quot-trends",
                component: QuotTrendsComponent
            },
            {
                path: "app-salse-order",
                component: SalseOrderComponent
            }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalseRoutingModule { }
