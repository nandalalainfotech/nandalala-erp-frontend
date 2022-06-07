import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnHumanResourcesRoutingModule } from './learn-human-resources-routing.module';
import { LearnHumanResourcesComponent } from './learn-human-resources.component';


@NgModule({
  declarations: [ LearnHumanResourcesComponent ],
  imports: [
    CommonModule,
    LearnHumanResourcesRoutingModule
  ]
})
export class LearnHumanResourcesModule { }
