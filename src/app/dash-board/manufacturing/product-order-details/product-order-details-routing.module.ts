import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdOrderComponent } from './prod-order/prod-order.component';
import { ProductOrderDetailsComponent } from './product-order-details.component';
import { ProductPlanComponent } from './product-plan/product-plan.component';
import { ProductStockComponent } from './product-stock/product-stock.component';
import { ProductTimestComponent } from './product-timest/product-timest.component';

const routes: Routes = [
  {
      path: "",
      component: ProductOrderDetailsComponent,
      children: [
          {
              path: "app-prod-order",
              component: ProdOrderComponent,
          },
          {
              path: "app-product-plan",
              component: ProductPlanComponent
          },
          {
              path: "app-product-stock",
              component: ProductStockComponent
          },
          {
              path: "app-product-timest",
              component: ProductTimestComponent
          }
      ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductOrderDetailsRoutingModule { }
