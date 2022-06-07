import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmHelpRoutingModule } from './crm-help-routing.module';
import { CrmHelpComponent } from './crm-help.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ CrmHelpComponent ],
  imports: [
    CommonModule,
    CrmHelpRoutingModule,
    BreadcrumbModule
  ]
})
export class CrmHelpModule { }
