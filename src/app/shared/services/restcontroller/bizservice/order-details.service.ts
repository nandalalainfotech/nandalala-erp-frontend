import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Order001mb } from "../entities/Order001mb";

@Injectable()

export class OrderDetailsManager extends BaseService {

    private orderDetailsUrl: string = `${environment.apiUrl}/orderdetails`

    orderdetall() {
        return this.getCallService(`${this.orderDetailsUrl}`+"/findAll");
    }

    orderdetsave(orderdetails: Order001mb) {
        return this.postCallService(`${this.orderDetailsUrl}`+"/save", {}, orderdetails);
    }

    orderdetupdate(orderdetails: Order001mb) {
        return this.putCallService(`${this.orderDetailsUrl}`+"/update", {}, orderdetails);
    }

    orderdetdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.orderDetailsUrl}`+"/delete", data);
    }

    orderDetailsPdf() {
        return this.getCallService1(`${this.orderDetailsUrl}` + "/pdf");
      }
    
      orderDetailsExcel() {
        return this.getCallService1(`${this.orderDetailsUrl}` + "/excel");
      }

}