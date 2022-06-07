import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Stktransentry001mb } from "../entities/Stktransentry001mb";

@Injectable()

export class StockEntryManager extends BaseService {

    private stockEntryUrl: string = `${environment.apiUrl}/stkentry`

    allstockentry() {
        return this.getCallService(`${this.stockEntryUrl}` + "/findAll");
    }

    savestockentry(stktransentry001mb: Stktransentry001mb) {
        return this.postCallService(`${this.stockEntryUrl}` + "/save", {}, stktransentry001mb)
    }

    updatestockentry(stktransentry001mb: Stktransentry001mb) {
        return this.putCallService(`${this.stockEntryUrl}` + "/update", {}, stktransentry001mb)
    }

    deletestockentry(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.stockEntryUrl}` + "/delete", data);
    }

    stockEntryPdf() {
        return this.getCallService1(`${this.stockEntryUrl}` + "/pdf");
    }

    stockEntryExcel() {
        return this.getCallService1(`${this.stockEntryUrl}` + "/excel");
    }
}