import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Customerdetails001mb } from "../entities/Customerdetails001mb";

@Injectable()

export class CustomerDetailManager extends BaseService {

    private customerDetailtUrl: string = `${environment.apiUrl}/customerdetail`;

    allcustomerdetail() {
        return this.getCallService(`${this.customerDetailtUrl}` + "/findAll");
    }

    savecustomerdetail(customerdetails001mb: Customerdetails001mb) {
        return this.postCallService(`${this.customerDetailtUrl}` + "/save", {}, customerdetails001mb);
    }

    updatecustomerdetail(customerdetails001mb: Customerdetails001mb) {
        return this.putCallService(`${this.customerDetailtUrl}` + "/update", {}, customerdetails001mb);
    }

    deletecustomerdetail(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.customerDetailtUrl}` + "/delete", data);
    }


    customerDetailPdf() {
       
        return this.getCallService1(`${this.customerDetailtUrl}` + "/pdf");
    }

    customerDetailExcel() {
        return this.getCallService1(`${this.customerDetailtUrl}` + "/excel");
    }
}