import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Empsalaryregister001mb } from "../entities/Empsalaryregister001mb";

@Injectable()
export class EmployeeSalesRegisterManager extends BaseService {

    private employeeSalesRegisterUrl: string = `${environment.apiUrl}/empsales`;

    allempsales() {
        return this.getCallService(`${this.employeeSalesRegisterUrl}` + "/findAll");
    }

    saveempsales(empsalaryregister001mb: Empsalaryregister001mb) {
        return this.postCallService(`${this.employeeSalesRegisterUrl}` + "/save", {}, empsalaryregister001mb);
    }

    updateempsales(empsalaryregister001mb: Empsalaryregister001mb) {
        return this.putCallService(`${this.employeeSalesRegisterUrl}` + "/update", {}, empsalaryregister001mb);
    }

    deleteempsales(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.employeeSalesRegisterUrl}` + "/delete", data);
    }

    employeeSalesRegisterPdf() {
        return this.getCallService1(`${this.employeeSalesRegisterUrl}` + "/pdf");
    }

    employeeSalesRegisterExcel() {
        return this.getCallService1(`${this.employeeSalesRegisterUrl}` + "/excel");
    }

}
