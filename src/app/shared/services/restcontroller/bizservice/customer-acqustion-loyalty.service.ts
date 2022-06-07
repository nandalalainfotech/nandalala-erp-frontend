import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Customeracquisition001mb } from "../entities/Customeracquisition001mb";

@Injectable()
export class CustomerLoyaltyManager extends BaseService {

    private customerLoyaltUrl: string = `${environment.apiUrl}/customerloyal`;

    allcustomerloyal() {
        return this.getCallService(`${this.customerLoyaltUrl}` + "/findAll");
    }
    savecustomerloyal(customeracquisition001mb: Customeracquisition001mb) {
        return this.postCallService(`${this.customerLoyaltUrl}` + "/save", {}, customeracquisition001mb);
    }
    updatecustomerloyal(customeracquisition001mb: Customeracquisition001mb) {
        return this.putCallService(`${this.customerLoyaltUrl}` + "/update", {}, customeracquisition001mb);
    }
    deletecustomerloyal(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.customerLoyaltUrl}` + "/delete", data);
    }

    customerLoyaltyPdf() {
        return this.getCallService1(`${this.customerLoyaltUrl}` + "/pdf");
    }

    customerLoyaltyExcel() {
        return this.getCallService1(`${this.customerLoyaltUrl}` + "/excel");
    }
}