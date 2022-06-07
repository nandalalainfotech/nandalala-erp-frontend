import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnStockRoutingModule } from './learn-stock-routing.module';
import { LearnStockComponent } from './learn-stock.component';


@NgModule({
  declarations: [ LearnStockComponent ],
  imports: [
    CommonModule,
    LearnStockRoutingModule
  ]
})
export class LearnStockModule { }
