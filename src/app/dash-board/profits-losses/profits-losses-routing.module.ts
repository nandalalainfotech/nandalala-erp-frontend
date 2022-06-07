import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfitsLossesComponent } from './profits-losses.component';

const routes: Routes = [
  {
    path:'',
    component:ProfitsLossesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitsLossesRoutingModule { }
