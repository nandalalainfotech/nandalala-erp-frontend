import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Puranalytics001mb } from "../entities/Puranalytics001mb";

@Injectable()

export class PuAnalyticsManager extends BaseService {

  private puAnalyticsUrl: string = `${environment.apiUrl}/puanalytics`

    allpuanalytics() {
        return this.getCallService(`${this.puAnalyticsUrl}`+"/findAll");
      }

      savepuanalysticsave(puranalytics001mb: Puranalytics001mb) {
        return this.postCallService(`${this.puAnalyticsUrl}`+"/save", {}, puranalytics001mb);
      }

      savepuanalysticupdate(puranalytics001mb: Puranalytics001mb) {
        return this.putCallService(`${this.puAnalyticsUrl}`+"/update", {}, puranalytics001mb);
      }

      deletepuanalystic(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.puAnalyticsUrl}`+"/delete", data);
      }

      puAnalyticsPdf() {
        return this.getCallService1(`${this.puAnalyticsUrl}` + "/pdf");
      }
    
      puAnalyticsExcel() {
        return this.getCallService1(`${this.puAnalyticsUrl}` + "/excel");
      }

}