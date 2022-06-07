import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Salarycomponent001mb } from "../entities/Salarycomponent001mb";

@Injectable()
export class HrSalarycomponentManager extends BaseService {

  private hrSalarycomponentUrl: string = `${environment.apiUrl}/component` 
  
    allcomponent() {
        return this.getCallService(`${this.hrSalarycomponentUrl}`+"/findAll");
      }
      savecomponent(salarycomponent001mb: Salarycomponent001mb) {
        return this.postCallService(`${this.hrSalarycomponentUrl}`+"/save",{}, salarycomponent001mb);
      }
      updatecomponent(salarycomponent001mb: Salarycomponent001mb) {
        return this.putCallService(`${this.hrSalarycomponentUrl}`+"/update",{}, salarycomponent001mb);
      }
      deletecomponent(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.hrSalarycomponentUrl}`+"/delete", data);
      }

      salcomponentPdf() {
        return this.getCallService1(`${this.hrSalarycomponentUrl}` + "/pdf");
    }

    salcomponentExcel() {
        return this.getCallService1(`${this.hrSalarycomponentUrl}` + "/excel");
    }

}