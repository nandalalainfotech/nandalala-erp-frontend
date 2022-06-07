import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Stkrepledger001mb } from "../entities/Stkrepledger001mb";

@Injectable()
export class StockLedgerManager extends BaseService {

    private stockLedgerUrl: string = `${environment.apiUrl}/stkledger`

    allstkledger() {
        return this.getCallService(`${this.stockLedgerUrl}` + "/findAll");
    }
    savestkledger(stkrepledger001mb: Stkrepledger001mb) {
        return this.postCallService(`${this.stockLedgerUrl}` + "/save", {}, stkrepledger001mb);
    }
    updatestkledger(stkrepledger001mb: Stkrepledger001mb) {
        return this.putCallService(`${this.stockLedgerUrl}` + "/update", {}, stkrepledger001mb);
    }
    deletestkledger(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.stockLedgerUrl}` + "/delete", data);
    }

    stockLedgerPdf() {
        return this.getCallService1(`${this.stockLedgerUrl}` + "/pdf");
    }

    stockLedgerExcel() {
        return this.getCallService1(`${this.stockLedgerUrl}` + "/excel");
    }
}