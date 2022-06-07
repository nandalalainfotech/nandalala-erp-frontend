import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Orditemsdeliver001mb } from "../entities/Orditemsdeliver001mb";


@Injectable()
export class OrderItemDeliverManager extends BaseService {

    private orderItemDeliverUrl: string = `${environment.apiUrl}/orddeliver`

    allorddeliver() {
        return this.getCallService(`${this.orderItemDeliverUrl}` + "/findAll");
    }
    orddeliversave(orditemsdeliver001mb: Orditemsdeliver001mb) {
        return this.postCallService(`${this.orderItemDeliverUrl}` + "/save", {}, orditemsdeliver001mb);
    }
    orddeliverupdate(orditemsdeliver001mb: Orditemsdeliver001mb) {
        return this.putCallService(`${this.orderItemDeliverUrl}` + "/update", {}, orditemsdeliver001mb);
    }
    orddeliverdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.orderItemDeliverUrl}` + "/delete", data);
    }

    orderItemDeliverPdf() {
        return this.getCallService1(`${this.orderItemDeliverUrl}` + "/pdf");
    }

    orderItemDeliverExcel() {
        return this.getCallService1(`${this.orderItemDeliverUrl}` + "/excel");
    }

}