import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service'; 
import { Paymentrequest001mb } from "../entities/Paymentrequest001mb";

@Injectable()
export class PayementRequestManager extends BaseService {

  private payementRequestUrl: string = `${environment.apiUrl}/paymentrequest`

    allpay() {
    return this.getCallService(`${this.payementRequestUrl}`+"/findAll");
  }
  paysave(paymentrequest: Paymentrequest001mb) {
    return this.postCallService(`${this.payementRequestUrl}`+"/save",{}, paymentrequest);
  }
  payupdate(paymentrequest: Paymentrequest001mb) {
    return this.putCallService(`${this.payementRequestUrl}`+"/update",{},paymentrequest);
  }
  paydelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.payementRequestUrl}`+"/delete", data);
  }

  payementRequestPdf() {
    return this.getCallService1(`${this.payementRequestUrl}` + "/pdf");
  }

  payementRequestExcel() {
    return this.getCallService1(`${this.payementRequestUrl}` + "/excel");
  }
  
}
