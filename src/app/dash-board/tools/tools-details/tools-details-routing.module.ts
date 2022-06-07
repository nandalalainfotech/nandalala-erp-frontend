import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolComponent } from './tool/tool.component';
import { ToolsDetailsComponent } from './tools-details.component';

const routes: Routes = [
  {
    path: '',
    component: ToolsDetailsComponent,
    children: [
      {
        path: 'app-tool',
        component: ToolComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsDetailsRoutingModule { }
