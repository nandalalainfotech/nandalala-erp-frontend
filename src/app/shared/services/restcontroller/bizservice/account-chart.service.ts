import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Accountchart001mb } from "../entities/Accountchart001mb";

@Injectable()
export class AccountChartManager extends BaseService {

    private accountChartUrl: string = `${environment.apiUrl}/accchart`;
    
    allcharts() {
        return this.getCallService(`${this.accountChartUrl}`+"/findAll");
    }

    chartsave(accountchart: Accountchart001mb) {
        return this.postCallService(`${this.accountChartUrl}`+"/save", {}, accountchart);
    }

    chartupdate(accountchart: Accountchart001mb) {
        return this.putCallService(`${this.accountChartUrl}`+"/update", {}, accountchart);
    }

    chartdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.accountChartUrl}`+"/delete", data);
    }

    accountChartPdf() {
        return this.getCallService1(`${this.accountChartUrl}` + "/pdf");
      }
    
      accountChartExcel() {
        return this.getCallService1(`${this.accountChartUrl}` + "/excel");
      }
    

}