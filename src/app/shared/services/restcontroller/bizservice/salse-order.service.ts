import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Salesorder001mb } from "../entities/Salesorder001mb";

@Injectable()
export class SalseOrderManager extends BaseService {

    private salseOrderUrl: string = `${environment.apiUrl}/salseorder`

    allsalseorder() {
        return this.getCallService(`${this.salseOrderUrl}` + "/findAll");
    }

    savesalseorder(salseorder: Salesorder001mb) {
        return this.postCallService(`${this.salseOrderUrl}` + "/save", {}, salseorder);
    }

    updatesalseorder(salseorder: Salesorder001mb) {
        return this.putCallService(`${this.salseOrderUrl}` + "/update", {}, salseorder);
    }

    deletesalesorder(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.salseOrderUrl}` + "/delete", data);
    }

    salseOrderPdf() {
        return this.getCallService1(`${this.salseOrderUrl}` + "/pdf");
    }

    salseOrderExcel() {
        return this.getCallService1(`${this.salseOrderUrl}` + "/excel");
    }

}
