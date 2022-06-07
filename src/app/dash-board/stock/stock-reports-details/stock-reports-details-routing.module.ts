import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItmPriceReportComponent } from './itm-price-report/itm-price-report.component';
import { ItmShortageComponent } from './itm-shortage/itm-shortage.component';
import { ItmWiseLevelComponent } from './itm-wise-level/itm-wise-level.component';
import { OrdItmDeliverComponent } from './ord-itm-deliver/ord-itm-deliver.component';
import { PurItmOrderComponent } from './pur-itm-order/pur-itm-order.component';
import { ReqItmTransferComponent } from './req-itm-transfer/req-itm-transfer.component';
import { StockReportsDetailsComponent } from './stock-reports-details.component';

const routes: Routes = [
    {
        path: '',
        component: StockReportsDetailsComponent,
        children: [
            {
                path: 'app-ord-itm-deliver',
                component: OrdItmDeliverComponent
            },
            {
                path: 'app-pur-itm-order',
                component: PurItmOrderComponent
            },
            {
                path: 'app-itm-shortage',
                component: ItmShortageComponent
            },
            {
                path: 'app-req-itm-transfer',
                component: ReqItmTransferComponent
            },
            {
                path: 'app-itm-price-report',
                component: ItmPriceReportComponent
            },
            {
                path: 'app-itm-wise-level',
                component: ItmWiseLevelComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StockReportsDetailsRoutingModule { }