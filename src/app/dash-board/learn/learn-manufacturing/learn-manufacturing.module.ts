import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnManufacturingRoutingModule } from './learn-manufacturing-routing.module';
import { LearnManufacturingComponent } from './learn-manufacturing.component';


@NgModule({
  declarations: [ LearnManufacturingComponent ],
  imports: [
    CommonModule,
    LearnManufacturingRoutingModule
  ]
})
export class LearnManufacturingModule { }
