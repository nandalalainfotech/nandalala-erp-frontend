import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnToolsRoutingModule } from './learn-tools-routing.module';
import { LearnToolsComponent } from './learn-tools.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ LearnToolsComponent ],
  imports: [
    CommonModule,
    LearnToolsRoutingModule,
    BreadcrumbModule
  ]
})
export class LearnToolsModule { }
