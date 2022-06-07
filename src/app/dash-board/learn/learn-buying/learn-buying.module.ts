import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnBuyingRoutingModule } from './learn-buying-routing.module';
import { LearnBuyingComponent } from './learn-buying.component';


@NgModule({
  declarations: [ LearnBuyingComponent ],
  imports: [
    CommonModule,
    LearnBuyingRoutingModule
  ]
})
export class LearnBuyingModule { }
