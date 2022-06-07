import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnSupportRoutingModule } from './learn-support-routing.module';
import { LearnSupportComponent } from './learn-support.component';


@NgModule({
  declarations: [ LearnSupportComponent ],
  imports: [
    CommonModule,
    LearnSupportRoutingModule
  ]
})
export class LearnSupportModule { }
