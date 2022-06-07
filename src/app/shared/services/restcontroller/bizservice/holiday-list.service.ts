import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Holidaylist001mb } from "../entities/Holidaylist001mb";

@Injectable()
export class HolidayListManager extends BaseService {

  private holidayListUrl: string = `${environment.apiUrl}/holidaylist`

    allholiday() {
        return this.getCallService(`${this.holidayListUrl}`+"/findAll");
      }
      holidaysave(holidaylist001mb: Holidaylist001mb) {
        return this.postCallService(`${this.holidayListUrl}`+"/save", {}, holidaylist001mb);
      }
      holidayupdate(holidaylist001mb: Holidaylist001mb) {
        return this.putCallService(`${this.holidayListUrl}`+"/update", {}, holidaylist001mb);
    }
    holidaydelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.holidayListUrl}`+"/delete", data);
      }

      holidayListPdf() {
        return this.getCallService1(`${this.holidayListUrl}` + "/pdf");
    }

    holidayListExcel() {
        return this.getCallService1(`${this.holidayListUrl}` + "/excel");
    }
}