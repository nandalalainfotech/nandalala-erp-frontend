import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchComponent } from './branch/branch.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { EmploymentTypeComponent } from './employment-type/employment-type.component';
import { HumanSetupComponent } from './human-setup.component';

const routes: Routes = [
  {
    path: "",
    component: HumanSetupComponent,
    children: [
      {
        path: "app-employment-type",
        component:EmploymentTypeComponent,
      },
      {
        path: "app-branch",
        component:BranchComponent,
      },
      {
        path: "app-designation",
        component:DesignationComponent,
      },
      {
        path: "app-department",
        component:DepartmentComponent,
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanSetupRoutingModule { }
