import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Empattendance001mb } from "../entities/Empattendance001mb";


@Injectable()
export class EmpAttendanceManager extends BaseService {

    private empAttendancUrl: string = `${environment.apiUrl}/attendance`;

    allattendance() {
        return this.getCallService(`${this.empAttendancUrl}` + "/findAll");
    }
    attendancesave(empattendance001mb: Empattendance001mb) {
        return this.postCallService(`${this.empAttendancUrl}` + "/save", {}, empattendance001mb);
    }
    attendanceupdate(empattendance001mb: Empattendance001mb) {
        return this.putCallService(`${this.empAttendancUrl}` + "/update", {}, empattendance001mb);
    }
    attendancedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.empAttendancUrl}` + "/delete", data);
    }
    empAttendancePdf() {
        return this.getCallService1(`${this.empAttendancUrl}` + "/pdf");
    }

    empAttendanceExcel() {
        return this.getCallService1(`${this.empAttendancUrl}` + "/excel");
    }

}