import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportIssuesRoutingModule } from './support-issues-routing.module';
import { SupportIssuesComponent } from './support-issues.component';


@NgModule({
  declarations: [ SupportIssuesComponent ],
  imports: [
    CommonModule,
    SupportIssuesRoutingModule
  ]
})

export class SupportIssuesModule { }