import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccToolsComponent } from './acc-tools.component';
import { AssetMovementComponent } from './asset-movement/asset-movement.component';
import { ChequeprintTemplateComponent } from './chequeprint-template/chequeprint-template.component';
import { PeriodclosingVoucherComponent } from './periodclosing-voucher/periodclosing-voucher.component';

const routes: Routes = [
    {
        path: "",
        component: AccToolsComponent,
        children: [
            {
                path: "app-periodclosing-voucher",
                component: PeriodclosingVoucherComponent
            },
            {
                path: "app-asset-movement",
                component: AssetMovementComponent
            },
            {
                path: "app-chequeprint-template",
                component: ChequeprintTemplateComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccToolsRoutingModule { }
