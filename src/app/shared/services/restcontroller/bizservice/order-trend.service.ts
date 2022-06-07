import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Delnotetrends001mb } from "../entities/Delnotetrends001mb";

@Injectable()

export class OrderTrendManager extends BaseService {

  private orderTrendUrl: string = `${environment.apiUrl}/ordertrend`

    allordertrend() {
        return this.getCallService(`${this.orderTrendUrl}`+"/findAll");
      }

      saveordertrend(delnotetrends001mb: Delnotetrends001mb) {
        return this.postCallService(`${this.orderTrendUrl}`+"/save", {}, delnotetrends001mb);
      }

      updateordertrend(delnotetrends001mb: Delnotetrends001mb) {
        return this.putCallService(`${this.orderTrendUrl}`+"/update", {}, delnotetrends001mb);
      }

      deleteordertrend(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.orderTrendUrl}`+"/delete", data);
      }

      orderTrendPdf() {
        return this.getCallService1(`${this.orderTrendUrl}` + "/pdf");
      }
    
      orderTrendExcel() {
        return this.getCallService1(`${this.orderTrendUrl}` + "/excel");
      }

}