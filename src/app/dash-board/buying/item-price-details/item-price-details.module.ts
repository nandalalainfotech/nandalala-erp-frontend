import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ItemPriceDetailsRoutingModule } from './item-price-details-routing.module';
import { ItemGroupComponent } from './item-group/item-group.component';
import { ItemPriceComponent } from './item-price/item-price.component';
import { ProductBundleComponent } from './product-bundle/product-bundle.component';
import { PricingRuleComponent } from './pricing-rule/pricing-rule.component';
import { ShippingRuleComponent } from './shipping-rule/shipping-rule.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { ItemPriceDetailsComponent } from './item-price-details.component';
import { SalesItemComponent } from './sales-item/sales-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ItemGroupManager } from 'src/app/shared/services/restcontroller/bizservice/item-group.service';
import { ItemPriceManager } from 'src/app/shared/services/restcontroller/bizservice/item-price.service';
import { ProdBundleManager } from 'src/app/shared/services/restcontroller/bizservice/product-bundle.service';
import { PricingRuleManager } from 'src/app/shared/services/restcontroller/bizservice/pricing-rule.service';
import { ShippingRuleManager } from 'src/app/shared/services/restcontroller/bizservice/shipping-rule.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [
        ItemPriceDetailsComponent,
        ItemGroupComponent,
        ItemPriceComponent,
        ProductBundleComponent,
        PricingRuleComponent,
        ShippingRuleComponent,
        SalesItemComponent
    ],
    imports: [
        CommonModule,
        ItemPriceDetailsRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        ItemGroupManager,
        ItemPriceManager,
        ProdBundleManager,
        PricingRuleManager,
        ShippingRuleManager,
        SalesItemManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ItemPriceDetailsModule { }