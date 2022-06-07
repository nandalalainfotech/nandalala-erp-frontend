import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSetupRoutingModule } from './account-setup-routing.module';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { AccountSetupComponent } from './account-setup.component';




@NgModule({
  declarations: [
    AccountSetupComponent
  ],
  imports: [
    CommonModule,
    AccountSetupRoutingModule,
    BreadcrumbModule

  ]
})
export class AccountSetupModule { }
