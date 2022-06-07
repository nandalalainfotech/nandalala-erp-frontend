import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HumanHelpComponent } from './human-help.component';

const routes: Routes = [
  {
    path: "",
    component: HumanHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanHelpRoutingModule { }
