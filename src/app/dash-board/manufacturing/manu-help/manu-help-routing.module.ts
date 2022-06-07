import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManufacturingComponent } from '../manufacturing.component';
import { ManuHelpComponent } from './manu-help.component';

const routes: Routes = [
  {
    path: "",
    component: ManuHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManuHelpRoutingModule { }
