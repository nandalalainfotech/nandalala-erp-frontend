import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolsComponent } from './tools.component';

const routes: Routes = [
    {
        path: '',
        component: ToolsComponent,
        children: [
            {
                path: 'app-tools-details',
                loadChildren: () => import("./tools-details/tools-details.module").then(m => m.ToolsDetailsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToolsRoutingModule { }
