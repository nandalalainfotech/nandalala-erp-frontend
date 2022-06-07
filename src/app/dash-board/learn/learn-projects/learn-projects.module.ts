import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnProjectsRoutingModule } from './learn-projects-routing.module';
import { LearnProjectsComponent } from './learn-projects.component';


@NgModule({
  declarations: [ LearnProjectsComponent ],
  imports: [
    CommonModule,
    LearnProjectsRoutingModule
  ]
})
export class LearnProjectsModule { }
