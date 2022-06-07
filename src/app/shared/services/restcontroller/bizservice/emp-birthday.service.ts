import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Employbirthday001mb } from "../entities/Employbirthday001mb";
import { Recruitrelieving001mb } from "../entities/Recruitrelieving001mb";

@Injectable()
export class EmployeeBirthManager extends BaseService {

    private employeeBirthUrl: string = `${environment.apiUrl}/empbirthday`;

    allempbirthday() {
        return this.getCallService(`${this.employeeBirthUrl}`+"/findAll");
    }

    saveempbirthday(employbirthday001mb: Employbirthday001mb) {
        return this.postCallService(`${this.employeeBirthUrl}`+"/save", {}, employbirthday001mb);
    }

    updateempbirthday(employbirthday001mb:Employbirthday001mb) {
        return this.putCallService(`${this.employeeBirthUrl}`+"/update", {}, employbirthday001mb);
    }

    deleteempbirthday(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.employeeBirthUrl}`+"/delete", data);
    }

    employeeBirthPdf() {
        return this.getCallService1(`${this.employeeBirthUrl}` + "/pdf");
      }
    
      employeeBirthExcel() {
        return this.getCallService1(`${this.employeeBirthUrl}` + "/excel");
      }

}
