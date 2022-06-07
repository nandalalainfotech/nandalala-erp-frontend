import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Accountsreceivable001mb } from "../entities/Accountsreceivable001mb";

@Injectable()
export class AccountsReceivableManager extends BaseService {

  private accountsReceivabletUrl: string = `${environment.apiUrl}/accountsreceivable`;
  
    allaccrec() {
    return this.getCallService(`${this.accountsReceivabletUrl}`+"/findAll");
  }

  accrecsave(accountsreceivable: Accountsreceivable001mb) {
    return this.postCallService(`${this.accountsReceivabletUrl}`+"/save",{}, accountsreceivable);
  }

  accrecupdate(accountsreceivable: Accountsreceivable001mb) {
    return this.putCallService(`${this.accountsReceivabletUrl}`+"/update", {}, accountsreceivable);
  }

  accrecdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.accountsReceivabletUrl}`+"/delete", data);
  }

  accountsReceivablePdf() {
    return this.getCallService1(`${this.accountsReceivabletUrl}` + "/pdf");
  }

  accountsReceivableExcel() {
    return this.getCallService1(`${this.accountsReceivabletUrl}` + "/excel");
  }
  
}
