import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnCrmRoutingModule } from './learn-crm-routing.module';
import { LearnCrmComponent } from './learn-crm.component';


@NgModule({
  declarations: [ LearnCrmComponent ],
  imports: [
    CommonModule,
    LearnCrmRoutingModule
  ]
})
export class LearnCrmModule { }
