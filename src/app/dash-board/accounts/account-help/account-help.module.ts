import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountHelpRoutingModule } from './account-help-routing.module';
import { AccountHelpComponent } from './account-help.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ AccountHelpComponent ],
  imports: [
    CommonModule,
    AccountHelpRoutingModule,
    BreadcrumbModule
  ]
})
export class AccountHelpModule { }
