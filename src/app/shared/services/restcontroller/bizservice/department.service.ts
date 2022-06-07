import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Department001mb } from "../entities/Department001mb";


@Injectable()

export class DepartmentManager extends BaseService {

  private departmentUrl: string = `${environment.apiUrl}/depart`;

  alldepart() {
    return this.getCallService(`${this.departmentUrl}` + "/findAll");
  }
  savedepart(department001mb: Department001mb) {
    return this.postCallService(`${this.departmentUrl}` + "/save", {}, department001mb);
  }
  updatedepart(department001mb: Department001mb) {
    return this.putCallService(`${this.departmentUrl}` + "/update", {}, department001mb);
  }
  deletedepart(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.departmentUrl}` + "/delete", data);
  }

  departmentPdf() {
    return this.getCallService1(`${this.departmentUrl}` + "/pdf");
  }

  departmentExcel() {
    return this.getCallService1(`${this.departmentUrl}` + "/excel");
  }
}