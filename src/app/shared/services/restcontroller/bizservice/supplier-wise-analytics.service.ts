import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Swsanalytics001mb } from "../entities/Swsanalytics001mb";

@Injectable()

export class SupplierWiseAnalyticsManager extends BaseService {

    private supplierWiseAnalyticsUrl: string = `${environment.apiUrl}/supplierwise`
    
    allsupplierwise() {
        return this.getCallService(`${this.supplierWiseAnalyticsUrl}`+"/findAll");
    }

    supplierwisesave(swsanalytics001mb: Swsanalytics001mb) {
        return this.postCallService(`${this.supplierWiseAnalyticsUrl}`+"/save", {}, swsanalytics001mb);
    }

    supplierwiseupdate(swsanalytics001mb: Swsanalytics001mb) {
        return this.putCallService(`${this.supplierWiseAnalyticsUrl}`+"/update", {}, swsanalytics001mb);
    }

    deletesupplierwise(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.supplierWiseAnalyticsUrl}`+"/delete", data);
    }

    supplierWiseAnalyticsPdf() {
        return this.getCallService1(`${this.supplierWiseAnalyticsUrl}` + "/pdf");
      }
    
      supplierWiseAnalyticsExcel() {
        return this.getCallService1(`${this.supplierWiseAnalyticsUrl}` + "/excel");
      }

}