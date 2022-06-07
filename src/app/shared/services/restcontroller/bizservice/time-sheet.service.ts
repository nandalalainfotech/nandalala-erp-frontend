import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Dailytimesheet001mb } from "../entities/Dailytimesheet001mb";

@Injectable()
export class TimeSheetManager extends BaseService {

  private timeSheetUrl: string = `${environment.apiUrl}/timesheet`

  alltimesheet() {
    return this.getCallService(`${this.timeSheetUrl}` + "/findAll");
  }
  timesheetsave(dailytimeshett001mb: Dailytimesheet001mb) {
    return this.postCallService(`${this.timeSheetUrl}` + "/save", {}, dailytimeshett001mb);
  }
  timesheetupdate(dailytimeshett001mb: Dailytimesheet001mb) {
    return this.putCallService(`${this.timeSheetUrl}` + "/update", {}, dailytimeshett001mb);
  }
  timesheetdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.timeSheetUrl}` + "/delete", data);
  }

  timeSheetPdf() {
    return this.getCallService1(`${this.timeSheetUrl}` + "/pdf");
  }

  timeSheetExcel() {
    return this.getCallService1(`${this.timeSheetUrl}` + "/excel");
  }
}