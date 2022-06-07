import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Territory001mb } from "../entities/Territory001mb";

@Injectable()
export class CrmTerritoryManager extends BaseService {

  private crmTerritoryUrl: string = `${environment.apiUrl}/crmterritory`;

  allterritory() {
    return this.getCallService(`${this.crmTerritoryUrl}` + "/findAll");
  }
  territorysave(territory001: Territory001mb) {
    return this.postCallService(`${this.crmTerritoryUrl}` + "/save", {}, territory001);
  }
  territoryupdate(territory001: Territory001mb) {
    return this.putCallService(`${this.crmTerritoryUrl}` + "/update", {}, territory001);
  }
  territorydelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.crmTerritoryUrl}` + "/delete", data);
  }

  crmTerritoryPdf() {
    return this.getCallService1(`${this.crmTerritoryUrl}` + "/pdf");
  }

  crmTerritoryExcel() {
    return this.getCallService1(`${this.crmTerritoryUrl}` + "/excel");
  }
}