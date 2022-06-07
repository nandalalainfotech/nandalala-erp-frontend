import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Salarystructure001mb } from "../entities/Salarystructure001mb";

@Injectable()
export class SalStructureManager extends BaseService {

  private salStructureUrl: string = `${environment.apiUrl}/salary` 
  
    allsalary() {
        return this.getCallService(`${this.salStructureUrl}`+"/findAll");
      }
      savesalary(salarystructure001mb: Salarystructure001mb) {
        return this.postCallService(`${this.salStructureUrl}`+"/save",{}, salarystructure001mb);
      }
      updatesalary(salarystructure001mb: Salarystructure001mb) {
        return this.putCallService(`${this.salStructureUrl}`+"/update",{}, salarystructure001mb);
      }
      deletesalary(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.salStructureUrl}`+"/delete", data);
      }

      salstructurePdf() {
        return this.getCallService1(`${this.salStructureUrl}` + "/pdf");
    }

    salstructureExcel() {
        return this.getCallService1(`${this.salStructureUrl}` + "/excel");
    }

}