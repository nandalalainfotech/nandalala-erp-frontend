import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemGroupComponent } from './item-group/item-group.component';
import { ItemPriceDetailsComponent } from './item-price-details.component';
import { ItemPriceComponent } from './item-price/item-price.component';
import { PricingRuleComponent } from './pricing-rule/pricing-rule.component';
import { ProductBundleComponent } from './product-bundle/product-bundle.component';
import { SalesItemComponent } from './sales-item/sales-item.component';
import { ShippingRuleComponent } from './shipping-rule/shipping-rule.component';

const routes: Routes = [
    {
        path: '',
        component: ItemPriceDetailsComponent,
        children: [
            {
                path: 'app-item-group',
                component: ItemGroupComponent
            },
            {
                path: 'app-item-price',
                component: ItemPriceComponent
            },
            {
                path: 'app-product-bundle',
                component: ProductBundleComponent
            },
            {
                path: 'app-pricing-rule',
                component: PricingRuleComponent
            },
            {
                path: 'app-shipping-rule',
                component: ShippingRuleComponent
            },
            {
                path: 'app-sales-item',
                component: SalesItemComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemPriceDetailsRoutingModule { }