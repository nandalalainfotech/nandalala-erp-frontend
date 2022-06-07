import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Setupcugrp001mb } from "../entities/Setupcugrp001mb";

@Injectable()
export class CrmCustGroupManager extends BaseService {

  private crmCustGroupUrl: string = `${environment.apiUrl}/crmcustgroup`;

  allcusgrp() {
    return this.getCallService(`${this.crmCustGroupUrl}` + "/findAll");
  }
  cusgrpsave(setupcugrp: Setupcugrp001mb) {
    return this.postCallService(`${this.crmCustGroupUrl}` + "/save", {}, setupcugrp);
  }
  cusgrpupdate(setupcugrp: Setupcugrp001mb) {
    return this.putCallService(`${this.crmCustGroupUrl}` + "/update", {}, setupcugrp);
  }
  cusgrpdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.crmCustGroupUrl}` + "/delete", data);
  }

  crmCustGroupPdf() {
    return this.getCallService1(`${this.crmCustGroupUrl}` + "/pdf");
  }

  crmCustGroupExcel() {
    return this.getCallService1(`${this.crmCustGroupUrl}` + "/excel");
  }
}