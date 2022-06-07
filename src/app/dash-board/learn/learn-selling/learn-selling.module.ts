import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnSellingRoutingModule } from './learn-selling-routing.module';
import { LearnSellingComponent } from './learn-selling.component';


@NgModule({
  declarations: [ LearnSellingComponent ],
  imports: [
    CommonModule,
    LearnSellingRoutingModule
  ]
})
export class LearnSellingModule { }
