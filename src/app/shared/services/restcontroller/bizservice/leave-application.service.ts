import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Leaveapp001mb } from "../entities/Leaveapp001mb";

@Injectable()
export class LeaveApplicationManager extends BaseService {

  private leaveApplicationUrl: string = `${environment.apiUrl}/leaveapp`

    allleaveapp() {
        return this.getCallService(`${this.leaveApplicationUrl}`+"/findAll");
      }
      leaveappsave(leaveapp001mb: Leaveapp001mb) {
        return this.postCallService(`${this.leaveApplicationUrl}`+"/save", {}, leaveapp001mb);
      }
      holidayupdate(leaveapp001mb: Leaveapp001mb) {
        return this.putCallService(`${this.leaveApplicationUrl}`+"/update", {}, leaveapp001mb);
    }
    leaveappdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.leaveApplicationUrl}`+"/delete", data);
      }
      leaveApplicationPdf() {
        return this.getCallService1(`${this.leaveApplicationUrl}` + "/pdf");
    }

    leaveApplicationExcel() {
        return this.getCallService1(`${this.leaveApplicationUrl}` + "/excel");
    }

}