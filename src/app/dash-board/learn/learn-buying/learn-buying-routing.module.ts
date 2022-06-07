import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyingHelpComponent } from '../../buying/buying-help/buying-help.component';
import { LearnBuyingComponent } from './learn-buying.component';

const routes: Routes = [
  {
    path: "app-learn-buying",
    component: LearnBuyingComponent
  },
  {
    path: "",
    component: BuyingHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnBuyingRoutingModule { }
