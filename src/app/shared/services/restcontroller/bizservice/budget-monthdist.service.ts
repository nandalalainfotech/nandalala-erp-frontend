import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Budgetmonthdist001mb } from "../entities/Budgetmonthdist001mb";

@Injectable()

export class BudgetMonthDistManager extends BaseService {

  private budgetMonthDistUrl: string = `${environment.apiUrl}/budgetmonthdist`;

    allbudmon() {
        return this.getCallService(`${this.budgetMonthDistUrl}`+"/findAll");
      }

      budmonsave(budgetmonthdist001mb: Budgetmonthdist001mb) {
        return this.postCallService(`${this.budgetMonthDistUrl}`+"/save", {}, budgetmonthdist001mb);
      }

      budmonupdate(budgetmonthdist001mb: Budgetmonthdist001mb) {
        return this.putCallService(`${this.budgetMonthDistUrl}`+"/update", {}, budgetmonthdist001mb);
      }
      
      budmondelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.budgetMonthDistUrl}`+"/delete", data);
      }


      budgetMonthDistPdf() {
        return this.getCallService1(`${this.budgetMonthDistUrl}` + "/pdf");
      }
    
      budgetMonthDistExcel() {
        return this.getCallService1(`${this.budgetMonthDistUrl}` + "/excel");
      }
}