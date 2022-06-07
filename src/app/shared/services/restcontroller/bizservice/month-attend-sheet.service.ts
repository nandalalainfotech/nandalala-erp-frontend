import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Monthlyattendsheet001mb } from "../entities/Monthlyattendsheet001mb";

@Injectable()
export class MonthAttendSheetManager extends BaseService {

    private monthAttendSheetUrl: string = `${environment.apiUrl}/empmonth`;

    allempmonth() {
        return this.getCallService(`${this.monthAttendSheetUrl}`+"/findAll");
    }

    saveempmonth(monthlyattendsheet001mb: Monthlyattendsheet001mb) {
        return this.postCallService(`${this.monthAttendSheetUrl}`+"/save", {}, monthlyattendsheet001mb);
    }

    updateempmonth(monthlyattendsheet001mb:Monthlyattendsheet001mb) {
        return this.putCallService(`${this.monthAttendSheetUrl}`+"/update", {}, monthlyattendsheet001mb);
    }

    deleteempmonth(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.monthAttendSheetUrl}`+"/delete", data);
    }

    monthAttendSheetPdf() {
        return this.getCallService1(`${this.monthAttendSheetUrl}` + "/pdf");
      }
    
      monthAttendSheetExcel() {
        return this.getCallService1(`${this.monthAttendSheetUrl}` + "/excel");
      }

}
