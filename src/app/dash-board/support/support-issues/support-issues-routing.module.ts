import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportIssuesComponent } from './support-issues.component';


const routes: Routes = [
  {
    path: "",
    component: SupportIssuesComponent,
    children: [
      {
        path: "app-issues",
        loadChildren: () => import("./issues/issues.module").then(m => m.IssuesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SupportIssuesRoutingModule { }