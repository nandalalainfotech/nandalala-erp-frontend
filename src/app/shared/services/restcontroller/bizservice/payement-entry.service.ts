import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Paymententry001mb } from "../entities/Paymententry001mb";

@Injectable()
export class PayementEntryManager extends BaseService {

  private payementEntryUrl: string = `${environment.apiUrl}/payementEntry`

  allpayentry() {
    return this.getCallService(`${this.payementEntryUrl}` + "/findAll");
  }
  payentrysave(paymententry: Paymententry001mb) {
    return this.postCallService(`${this.payementEntryUrl}` + "/save", {}, paymententry);
  }
  payentryupdate(paymententry: Paymententry001mb) {
    return this.putCallService(`${this.payementEntryUrl}` + "/update", {}, paymententry);
  }
  payentrydelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.payementEntryUrl}` + "/delete", data);
  }

  payementEntryPdf() {
    return this.getCallService1(`${this.payementEntryUrl}` + "/pdf");
  }

  payementEntryExcel() {
    return this.getCallService1(`${this.payementEntryUrl}` + "/excel");
  }


}
