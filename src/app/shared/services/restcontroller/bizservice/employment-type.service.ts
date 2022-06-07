import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Employmenttype001mb } from "../entities/Employmenttype001mb";

@Injectable()

export class EmploymentTypeManager extends BaseService {
    private employmentTypeUrl: string = `${environment.apiUrl}/emptype`;

    allemptype() {
        return this.getCallService(`${this.employmentTypeUrl}` + "/findAll");
    }
    saveemptype(employmenttype001mb: Employmenttype001mb) {
        return this.postCallService(`${this.employmentTypeUrl}` + "/save", {}, employmenttype001mb);
    }
    updateemptype(employmenttype001mb: Employmenttype001mb) {
        return this.putCallService(`${this.employmentTypeUrl}` + "/update", {}, employmenttype001mb);
    }
    deleteemptype(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.employmentTypeUrl}` + "/delete", data);
    }

    employmentTypePdf() {
        return this.getCallService1(`${this.employmentTypeUrl}` + "/pdf");
    }

    employmentTypeExcel() {
        return this.getCallService1(`${this.employmentTypeUrl}` + "/excel");
    }
}
