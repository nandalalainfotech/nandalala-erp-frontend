import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BomTypeComponent } from './bom-type/bom-type.component';
import { CompleteOrderComponent } from './complete-order/complete-order.component';
import { IssueItemComponent } from './issue-item/issue-item.component';
import { OpenOrderComponent } from './open-order/open-order.component';
import { ProductReportdetailsComponent } from './product-reportdetails.component';
import { ProgressOrderComponent } from './progress-order/progress-order.component';
const routes: Routes = [
    {
        path: "",
        component: ProductReportdetailsComponent,
        children: [
            {
                path: "app-open-order",
                component: OpenOrderComponent
            },
            {
                path: "app-progress-order",
                component: ProgressOrderComponent
            },
            {
                path: "app-complete-order",
                component: CompleteOrderComponent
            },
            {
                path: "app-bom-type",
                component: BomTypeComponent
            },
            {
                path: "app-issue-item",
                component: IssueItemComponent
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductReportdetailsRoutingModule { }
