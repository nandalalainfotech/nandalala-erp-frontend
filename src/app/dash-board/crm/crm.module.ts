import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './crm.component';
import { CrmHelpComponent } from './crm-help/crm-help.component';




@NgModule({
  declarations: [ CrmComponent ],
  imports: [
    
    CommonModule,
    CrmRoutingModule
  ]
})
export class CrmModule { }
