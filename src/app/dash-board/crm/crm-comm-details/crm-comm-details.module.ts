import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmCommDetailsRoutingModule } from './crm-comm-details-routing.module';
import { CrmCommDetailsComponent } from './crm-comm-details.component';


@NgModule({
  declarations: [
    CrmCommDetailsComponent
  ],
  imports: [
    CommonModule,
    CrmCommDetailsRoutingModule
  ]
})
export class CrmCommDetailsModule { }
