import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Prpurchaseord001mb } from "../entities/Prpurchaseord001mb";

@Injectable()
export class PurchaseOrdersManager extends BaseService {

  private purchaseOrdersUrl: string = `${environment.apiUrl}/purchaseorder`
  
    allpurchaseorder() {
    return this.getCallService(`${this.purchaseOrdersUrl}`+"/findAll");
  }

  purchaseordersave(prpurchaseord001mb: Prpurchaseord001mb) {
    return this.postCallService(`${this.purchaseOrdersUrl}`+"/save",{}, prpurchaseord001mb);
  }

  purchaseorderupdate(prpurchaseord001mb: Prpurchaseord001mb) {
    return this.putCallService(`${this.purchaseOrdersUrl}`+"/update", {}, prpurchaseord001mb);
  }

  purchaseorderdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.purchaseOrdersUrl}`+"/delete", data);
  }

  purchaseOrdersPdf() {
    return this.getCallService1(`${this.purchaseOrdersUrl}` + "/pdf");
  }

  purchaseOrdersExcel() {
    return this.getCallService1(`${this.purchaseOrdersUrl}` + "/excel");
  }
  
}
