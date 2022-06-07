import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Leavetype001mb } from "../entities/Leavetype001mb";

@Injectable()
export class LeaveTypeManager extends BaseService {

  private leaveTypeUrl: string = `${environment.apiUrl}/leavetype`

    allleavetype() {
        return this.getCallService(`${this.leaveTypeUrl}`+"/findAll");
      }
      leavetypesave(leavetype001mb: Leavetype001mb) {
        return this.postCallService(`${this.leaveTypeUrl}`+"/save", {}, leavetype001mb);
      }
      leavetypeupdate(leavetype001mb: Leavetype001mb) {
        return this.putCallService(`${this.leaveTypeUrl}`+"/update", {}, leavetype001mb);
    }
    leavetypedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.leaveTypeUrl}`+"/delete", data);
      }
      leaveTypePdf() {
        return this.getCallService1(`${this.leaveTypeUrl}` + "/pdf");
    }

    leaveTypeExcel() {
        return this.getCallService1(`${this.leaveTypeUrl}` + "/excel");
    }
}