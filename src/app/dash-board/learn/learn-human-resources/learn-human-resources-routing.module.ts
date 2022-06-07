import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HumanHelpComponent } from '../../human-resources/human-help/human-help.component';
import { LearnHumanResourcesComponent } from './learn-human-resources.component';

const routes: Routes = [
  {
    path: "app-learn-human-resources",
    component: LearnHumanResourcesComponent
  },
  {
    path: "",
    component: HumanHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnHumanResourcesRoutingModule { }
