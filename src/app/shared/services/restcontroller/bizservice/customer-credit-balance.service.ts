import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Customercreditbalance001mb } from "../entities/Customercreditbalance001mb";

@Injectable()
export class CustomerBalanceManager extends BaseService {

    private customerBalancetUrl: string = `${environment.apiUrl}/balance`;

    allbalance() {
        return this.getCallService(`${this.customerBalancetUrl}` + "/findAll");
    }

    savebalance(customercreditbalance001mb: Customercreditbalance001mb) {
        return this.postCallService(`${this.customerBalancetUrl}` + "/save", {}, customercreditbalance001mb);
    }

    updatebalance(customercreditbalance001mb: Customercreditbalance001mb) {
        return this.putCallService(`${this.customerBalancetUrl}` + "/update", {}, customercreditbalance001mb);
    }

    deletebalance(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.customerBalancetUrl}` + "/delete", data);
    }

    customerBalancePdf() {
        return this.getCallService1(`${this.customerBalancetUrl}` + "/pdf");
    }

    customerBalanceExcel() {
        return this.getCallService1(`${this.customerBalancetUrl}` + "/excel");
    }

}