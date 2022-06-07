import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Accountspayable001mb } from "../entities/Accountspayable001mb";

@Injectable()
export class AccountsPayableManager extends BaseService {

  private accountsPayabletUrl: string = `${environment.apiUrl}/accountspayable`;
  
    allaccpay() {
    return this.getCallService(`${this.accountsPayabletUrl}`+"/findAll");
  }

  accpaysave(accountspayable: Accountspayable001mb) {
    return this.postCallService(`${this.accountsPayabletUrl}`+"/save",{}, accountspayable);
  }

  accpayupdate(accountspayable: Accountspayable001mb) {
    return this.putCallService(`${this.accountsPayabletUrl}`+"/update", {}, accountspayable);
  }

  accpaydelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.accountsPayabletUrl}`+"/delete", data);
  }

  accountsPayablePdf() {
    return this.getCallService1(`${this.accountsPayabletUrl}` + "/pdf");
  }

  accountsPayableExcel() {
    return this.getCallService1(`${this.accountsPayabletUrl}` + "/excel");
  }

  
}
