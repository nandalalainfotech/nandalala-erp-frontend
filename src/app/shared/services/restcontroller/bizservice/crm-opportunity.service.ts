import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Crmspoppo001mb } from "../entities/Crmspoppo001mb";

@Injectable()

export class CrmOpportunityManager extends BaseService {

  private crmOpportunityUrl: string = `${environment.apiUrl}/opportunity`;

    allopportunity() {
        return this.getCallService(`${this.crmOpportunityUrl}`+"/findAll");
      }

      saveopportunity(crmspoppo001mb: Crmspoppo001mb) {
        return this.postCallService(`${this.crmOpportunityUrl}`+"/save", {}, crmspoppo001mb);
      }

      updateopportunity(crmspoppo001mb: Crmspoppo001mb) {
        return this.putCallService(`${this.crmOpportunityUrl}`+"/update", {}, crmspoppo001mb);
      }

      deleteopportunity(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.crmOpportunityUrl}`+"/delete", data);
      }

      crmOpportunityPdf() {
        return this.getCallService1(`${this.crmOpportunityUrl}` + "/pdf");
      }
    
      crmOpportunityExcel() {
        return this.getCallService1(`${this.crmOpportunityUrl}` + "/excel");
      }
}