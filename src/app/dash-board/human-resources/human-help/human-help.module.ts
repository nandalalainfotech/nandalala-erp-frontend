import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanHelpRoutingModule } from './human-help-routing.module';
import { HumanHelpComponent } from './human-help.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ HumanHelpComponent ],
  imports: [
    CommonModule,
    HumanHelpRoutingModule,
    BreadcrumbModule
  ]
})
export class HumanHelpModule { }
