import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemReportDetailsComponent } from './item-report-details.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
    {
        path: '',
        component: ItemReportDetailsComponent,
        children: [
            {
                path: 'app-item',
                component: ItemComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemReportDetailsRoutingModule { }
