import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductBundleComponent } from './product-bundle/product-bundle.component';
import { ItemGroupComponent } from './item-group/item-group.component';
import { ItemPriceComponent } from './item-price/item-price.component';
import { ItemComponent } from './item/item.component';
import { ItemsPricingComponent } from './items-pricing.component';
import { PricingRuleComponent } from './pricing-rule/pricing-rule.component';
import { ShippingRuleComponent } from './shipping-rule/shipping-rule.component';

const routes: Routes = [
    {
        path: '',
        component: ItemsPricingComponent,
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
                path: 'app-item',
                component: ItemComponent
            }
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemsPricingRoutingModule { }
