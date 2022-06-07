import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectHelpComponent } from '../../projects/project-help/project-help.component';
import { LearnProjectsComponent } from './learn-projects.component';

const routes: Routes = [
  {
    path: "app-learn-projects",
    component: LearnProjectsComponent
  },
  {
    path: "",
    component: ProjectHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnProjectsRoutingModule { }
