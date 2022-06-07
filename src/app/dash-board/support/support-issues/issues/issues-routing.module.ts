import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunicationComponent } from '../communication/communication.component';
import { IssueComponent } from './issue/issue.component';
import { IssuesComponent } from './issues.component';
import { MinutesToResponseComponent } from './minutes-to-response/minutes-to-response.component';

const routes: Routes = [
    {
        path: "",
        component: IssuesComponent,
        children: [
            {
                path: "app-issue",
                component: IssueComponent
            },
            {
                path: "app-minutes-to-response",
                component: MinutesToResponseComponent
            },
            {
                path: "app-communication",
                component: CommunicationComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IssuesRoutingModule { }
