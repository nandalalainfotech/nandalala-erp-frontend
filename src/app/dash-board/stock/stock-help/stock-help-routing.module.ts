import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockHelpComponent } from './stock-help.component';

const routes: Routes = [
  {
    path: "",
    component: StockHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockHelpRoutingModule { }
