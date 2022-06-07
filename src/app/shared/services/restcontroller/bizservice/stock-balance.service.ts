import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Stkrepbalance001mb } from "../entities/Stkrepbalance001mb";

@Injectable()
export class StockBalanceManager extends BaseService {

    private stockBalanceUrl: string = `${environment.apiUrl}/stkbalance`
    
    allstkbalance() {
        return this.getCallService(`${this.stockBalanceUrl}`+"/findAll");
    }
    savestkbalance(stkrepbalance001mb: Stkrepbalance001mb) {
        return this.postCallService(`${this.stockBalanceUrl}`+"/save", {}, stkrepbalance001mb);
    }
    updatestkbalance(stkrepbalance001mb: Stkrepbalance001mb) {
        return this.putCallService(`${this.stockBalanceUrl}`+"/update", {}, stkrepbalance001mb);
    }
    deletestkbalance(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.stockBalanceUrl}`+"/delete", data);
    }

    stockBalancePdf() {
        return this.getCallService1(`${this.stockBalanceUrl}` + "/pdf");
    }

    stockBalanceExcel() {
        return this.getCallService1(`${this.stockBalanceUrl}` + "/excel");
    }
}