import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Empleavebalance001mb } from "../entities/Empleavebalance001mb";

@Injectable()
export class EmployeeLeaveBalanceManager extends BaseService {

    private employeeLeaveBalanceUrl: string = `${environment.apiUrl}/empleave`;
    
    allempleave() {
        return this.getCallService(`${this.employeeLeaveBalanceUrl}`+"/findAll");
    }

    saveempleave(empleavebalance001mb: Empleavebalance001mb) {
        return this.postCallService(`${this.employeeLeaveBalanceUrl}`+"/save", {}, empleavebalance001mb);
    }

    updateempleave(empleavebalance001mb:Empleavebalance001mb) {
        return this.putCallService(`${this.employeeLeaveBalanceUrl}`+"/update", {}, empleavebalance001mb);
    }

    deleteempleave(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.employeeLeaveBalanceUrl}`+"/delete", data);
    }
    employeeLeaveBalancePdf() {
        return this.getCallService1(`${this.employeeLeaveBalanceUrl}` + "/pdf");
      }
    
      employeeLeaveBalanceExcel() {
        return this.getCallService1(`${this.employeeLeaveBalanceUrl}` + "/excel");
      }
    

}
