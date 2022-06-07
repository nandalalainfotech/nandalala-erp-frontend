import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalanderComponent } from './calander/calander.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { ProjectComponent } from './project.component';
import { ProjecttComponent } from './projectt/projectt.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectComponent,
        children: [
            {
                path: 'app-projectt',
                component: ProjecttComponent
            },
            {
                path: 'app-task',
                component: TaskComponent
            },
            {
                path: 'app-calander',
                component: CalanderComponent
            },
            {
                path: 'app-gantt-chart',
                component: GanttChartComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule { }
