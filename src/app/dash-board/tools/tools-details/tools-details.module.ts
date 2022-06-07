import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsDetailsRoutingModule } from './tools-details-routing.module';
import { ToolComponent } from './tool/tool.component';
import { ToolsDetailsComponent } from './tools-details.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    ToolsDetailsComponent,
    ToolComponent
  ],
  imports: [
    CommonModule,
    ToolsDetailsRoutingModule,
    BreadcrumbModule,
    MatTabsModule
  ]
})
export class ToolsDetailsModule { }
