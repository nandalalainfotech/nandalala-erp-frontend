import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyingReportDetailsComponent } from './buying-report-details.component';
import { ItemOrderedComponent } from './item-ordered/item-ordered.component';
import { ItemPuhistoryComponent } from './item-puhistory/item-puhistory.component';
import { ItemRequestComponent } from './item-request/item-request.component';
import { MatreqSupwiseComponent } from './matreq-supwise/matreq-supwise.component';

const routes: Routes = [{
    path: "",
    component: BuyingReportDetailsComponent,
    children: [
        {
            path: 'app-item-request',
            component: ItemRequestComponent
        },
        {
            path: 'app-item-ordered',
            component: ItemOrderedComponent
        },
        {
            path: 'app-item-puhistory',
            component: ItemPuhistoryComponent
        },
        {
            path: 'app-matreq-supwise',
            component: MatreqSupwiseComponent
        }
    ]
}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BuyingReportDetailsRoutingModule { }
