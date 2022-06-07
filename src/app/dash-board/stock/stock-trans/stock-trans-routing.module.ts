import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialComponent } from '../../manufacturing/bom-details/material/material.component';
import { DeliveryNoteComponent } from './delivery-note/delivery-note.component';
import { MaterialReqComponent } from './material-req/material-req.component';
import { PurchaseReceiptComponent } from './purchase-receipt/purchase-receipt.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { StockTransComponent } from './stock-trans.component';

const routes: Routes = [{
    path: '',
    component: StockTransComponent,
    children: [
        {
            path: 'app-stock-entry',
            component: StockEntryComponent
        },
        {
            path: 'app-delivery-note',
            component: DeliveryNoteComponent
        },
        {
            path: 'app-purchase-receipt',
            component: PurchaseReceiptComponent
        },
        {
            path: 'app-material-req',
            component: MaterialReqComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockTransRoutingModule { }
