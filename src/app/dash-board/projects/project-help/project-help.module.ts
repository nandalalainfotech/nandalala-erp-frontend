import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHelpRoutingModule } from './project-help-routing.module';
import { ProjectHelpComponent } from './project-help.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ ProjectHelpComponent ],
  imports: [
    CommonModule,
    ProjectHelpRoutingModule,
    BreadcrumbModule
  ]
})
export class ProjectHelpModule { }
