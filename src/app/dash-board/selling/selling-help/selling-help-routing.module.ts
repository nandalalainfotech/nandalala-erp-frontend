import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellingHelpComponent } from './selling-help.component';

const routes: Routes = [
  {
    path: "",
    component: SellingHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellingHelpRoutingModule { }
