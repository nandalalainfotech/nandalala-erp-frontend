import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellingHelpComponent } from '../../selling/selling-help/selling-help.component';
import { LearnSellingComponent } from './learn-selling.component';

const routes: Routes = [
  {
    path: "app-learn-selling",
    component: LearnSellingComponent
  },
  {
    path: "",
    component: SellingHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnSellingRoutingModule { }
