import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseRegisterComponent } from './purchase-register/purchase-register.component';
import { PurtaxChangesComponent } from './purtax-changes/purtax-changes.component';
import { SaleRegisterComponent } from './sale-register/sale-register.component';
import { SalesTaxesComponent } from './sales-taxes/sales-taxes.component';
import { TaxRuleComponent } from './tax-rule/tax-rule.component';
import { TaxesComponent } from './taxes.component';

const routes: Routes = [
    {
        path: "",
        component: TaxesComponent,
        children: [
            {
                path: "app-sales-taxes",
                component: SalesTaxesComponent
            },
            {
                path: "app-purtax-changes",
                component: PurtaxChangesComponent
            },
            {
                path: "app-tax-rule",
                component: TaxRuleComponent
            },
            {
                path: "app-sale-register",
                component: SaleRegisterComponent
            },
            {
                path: "app-purchase-register",
                component: PurchaseRegisterComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaxesRoutingModule { }
