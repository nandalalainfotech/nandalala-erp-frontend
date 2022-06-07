import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectedQuantityComponent } from './projected-quantity/projected-quantity.component';
import { StockAgeingComponent } from './stock-ageing/stock-ageing.component';
import { StockBalanceComponent } from './stock-balance/stock-balance.component';
import { StockLedgerComponent } from './stock-ledger/stock-ledger.component';
import { StockReportComponent } from './stock-report.component';

const routes: Routes = [
    {
        path: '',
        component: StockReportComponent,
        children: [
            {
                path: 'app-stock-ledger',
                component: StockLedgerComponent
            },
            {
                path: 'app-stock-balance',
                component: StockBalanceComponent
            },
            {
                path: 'app-projected-quantity',
                component: ProjectedQuantityComponent
            },
            {
                path: 'app-stock-ageing',
                component: StockAgeingComponent
            }
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockReportRoutingModule { }
