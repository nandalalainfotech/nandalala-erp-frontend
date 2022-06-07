import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Department001mb } from "../entities/Department001mb";


@Injectable()

export class EmpDeptmentManager extends BaseService {

    private empDeptmentUrl: string = `${environment.apiUrl}/department`;
    
    alldept() {
        return this.getCallService(`${this.empDeptmentUrl}`+"/findAll");
    }
    deptsave(department001mb: Department001mb) {
        return this.postCallService(`${this.empDeptmentUrl}`+"/save", {}, department001mb);
    }
    deptupdate(department001mb: Department001mb) {
        return this.putCallService(`${this.empDeptmentUrl}`+"/update", {}, department001mb);
    }
    deptdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.empDeptmentUrl}`+"/delete", data);
    }

    empDeptmentPdf() {
        return this.getCallService1(`${this.empDeptmentUrl}` + "/pdf");
      }
    
      empDeptmentExcel() {
        return this.getCallService1(`${this.empDeptmentUrl}` + "/excel");
      }

}