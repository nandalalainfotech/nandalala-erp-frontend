import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Empworkonholiday001mb } from "../entities/Empworkonholiday001mb";

@Injectable()
export class EmployeeHolidayWorkManager extends BaseService {

    private employeeHolidayWorkUrl: string = `${environment.apiUrl}/empholiday`;
    
    allempholiday() {
        return this.getCallService(`${this.employeeHolidayWorkUrl}`+"/findAll");
    }

    saveempholiday(empworkonholiday001mb: Empworkonholiday001mb) {
        return this.postCallService(`${this.employeeHolidayWorkUrl}`+"/save", {}, empworkonholiday001mb);
    }

    updateempholiday(empworkonholiday001mb: Empworkonholiday001mb) {
        return this.putCallService(`${this.employeeHolidayWorkUrl}`+"/update", {}, empworkonholiday001mb);
    }

    deleteempholiday(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.employeeHolidayWorkUrl}`+"/delete", data);
    }

    employeeHolidayPdf() {
        return this.getCallService1(`${this.employeeHolidayWorkUrl}` + "/pdf");
    }

    employeeHolidayExcel() {
        return this.getCallService1(`${this.employeeHolidayWorkUrl}` + "/excel");
    }


}
