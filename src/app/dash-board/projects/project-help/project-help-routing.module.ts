import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectHelpComponent } from './project-help.component';

const routes: Routes = [
  {
    path: "",
    component: ProjectHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectHelpRoutingModule { }
