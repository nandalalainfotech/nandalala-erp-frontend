import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveCostComponent } from './active-cost/active-cost.component';
import { ActiveTypeComponent } from './active-type/active-type.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { TimeTrakingComponent } from './time-traking.component';

const routes: Routes = [
  {
    path: '',
    component: TimeTrakingComponent,
    children: [
      {
        path: 'app-time-sheet',
        component: TimeSheetComponent
      },
      {
        path: 'app-active-type',
        component: ActiveTypeComponent
      },
      {
        path: 'app-active-cost',
        component: ActiveCostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTrakingRoutingModule { }
