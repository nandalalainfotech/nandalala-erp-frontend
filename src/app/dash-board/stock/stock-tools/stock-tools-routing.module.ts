import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstallationNoteComponent } from './installation-note/installation-note.component';
import { LandCostVoucherComponent } from './land-cost-voucher/land-cost-voucher.component';
import { PackingSlipComponent } from './packing-slip/packing-slip.component';
import { StockReconcileComponent } from './stock-reconcile/stock-reconcile.component';
import { StockToolsComponent } from './stock-tools.component';

const routes: Routes = [
    {
        path: '',
        component: StockToolsComponent,
        children: [
            {
                path: 'app-installation-note',
                component: InstallationNoteComponent
            },
            {
                path: 'app-stock-reconcile',
                component: StockReconcileComponent
            },
            {
                path: 'app-packing-slip',
                component: PackingSlipComponent
            },
            {
                path: 'app-land-cost-voucher',
                component: LandCostVoucherComponent
            }
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockToolsRoutingModule { }
