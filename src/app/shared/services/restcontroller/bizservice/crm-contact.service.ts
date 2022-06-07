import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Crmspcontact001mb } from "../entities/Crmspcontact001mb";

@Injectable()

export class CrmContactManager extends BaseService {

  private crmContactUrl: string = `${environment.apiUrl}/contact`;

  allcontact1() {
    return this.getCallService(`${this.crmContactUrl}` + "/findAll");
  }

  savespcontact(crmspcontact001mb: Crmspcontact001mb) {
    return this.postCallService(`${this.crmContactUrl}` + "/save", {}, crmspcontact001mb);
  }

  updatespcontact(crmspcontact001mb: Crmspcontact001mb) {
    return this.putCallService(`${this.crmContactUrl}` + "/update", {}, crmspcontact001mb);
  }

  deletespcontact(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.crmContactUrl}` + "/delete", data);
  }

  crmContactPdf() {
    return this.getCallService1(`${this.crmContactUrl}` + "/pdf");
  }

  crmContactExcel() {
    return this.getCallService1(`${this.crmContactUrl}` + "/excel");
  }
}