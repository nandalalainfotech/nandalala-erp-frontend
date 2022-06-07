import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManuHelpComponent } from '../../manufacturing/manu-help/manu-help.component';
import { LearnManufacturingComponent } from './learn-manufacturing.component';

const routes: Routes = [
  {
    path: "app-learn-manufacturing",
    component: LearnManufacturingComponent,
  },
  {
    path: "",
    component: ManuHelpComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnManufacturingRoutingModule { }
