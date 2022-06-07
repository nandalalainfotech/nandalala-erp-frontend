import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportHelpRoutingModule } from './support-help-routing.module';
import { SupportHelpComponent } from './support-help.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ SupportHelpComponent ],
  imports: [
    CommonModule,
    SupportHelpRoutingModule,
    BreadcrumbModule
  ]
})
export class SupportHelpModule { }
