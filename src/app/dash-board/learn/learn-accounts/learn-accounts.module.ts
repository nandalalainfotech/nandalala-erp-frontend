import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnAccountsRoutingModule } from './learn-accounts-routing.module';
import { LearnAccountsComponent } from './learn-accounts.component';


@NgModule({
  declarations: [ LearnAccountsComponent ],
  imports: [
    CommonModule,
    LearnAccountsRoutingModule
  ]
})
export class LearnAccountsModule { }
