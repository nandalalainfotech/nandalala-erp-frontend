import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockHelpComponent } from '../../stock/stock-help/stock-help.component';
import { LearnStockComponent } from './learn-stock.component';

const routes: Routes = [
  {
    path: "app-learn-stock",
    component: LearnStockComponent
  },
  {
    path: "",
    component: StockHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnStockRoutingModule { }
