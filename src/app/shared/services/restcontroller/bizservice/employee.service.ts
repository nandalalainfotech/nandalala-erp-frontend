import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Employee001mb } from "../entities/Employee001mb";

@Injectable()

export class EmployeeManager extends BaseService {

    private employeeUrl: string = `${environment.apiUrl}/employee`;
    
    allemployee() {
        return this.getCallService(`${this.employeeUrl}`+"/findAll");
    }
    employeesave(employee001mb: Employee001mb) {
        return this.postCallService(`${this.employeeUrl}`+"/save", {}, employee001mb);
    }
    employeeupdate(employee001mb: Employee001mb) {
        return this.putCallService(`${this.employeeUrl}`+"/update", {}, employee001mb);
    }
    employeedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.employeeUrl}`+"/delete", data);
    }

    employeePdf() {
        return this.getCallService1(`${this.employeeUrl}` + "/pdf");
      }
    
      employeeExcel() {
        return this.getCallService1(`${this.employeeUrl}` + "/excel");
      }
}
