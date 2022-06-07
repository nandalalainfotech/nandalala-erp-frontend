import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Inactivecust001mb } from "../entities/Inactivecust001mb";

@Injectable()
export class InactiveCustomerManager extends BaseService {

    private inactiveCustomerUrl: string = `${environment.apiUrl}/inactive`;

    allinact() {
        return this.getCallService(`${this.inactiveCustomerUrl}` + "/findAll");
    }
    inactsave(inactivecust: Inactivecust001mb) {
        return this.postCallService(`${this.inactiveCustomerUrl}` + "/save", {}, inactivecust);
    }
    inactupdate(inactivecust: Inactivecust001mb) {
        return this.putCallService(`${this.inactiveCustomerUrl}` + "/update", {}, inactivecust);
    }
    inactdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.inactiveCustomerUrl}` + "/delete", data);
    }

    inactiveCustomerPdf() {
        return this.getCallService1(`${this.inactiveCustomerUrl}` + "/pdf");
    }

    inactiveCustomerExcel() {
        return this.getCallService1(`${this.inactiveCustomerUrl}` + "/excel");
    }

}
