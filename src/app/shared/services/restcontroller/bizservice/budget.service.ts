import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Budget001mb } from "../entities/Budget001mb";

@Injectable()

export class BudgetManager extends BaseService {

    private budgetUrl: string = `${environment.apiUrl}/budget`;
    
    allbudget() {
        return this.getCallService(`${this.budgetUrl}`+"/findAll");
    }

    budgetsave(budget001mb: Budget001mb) {
        return this.postCallService(`${this.budgetUrl}`+"/save", {}, budget001mb);
    }

    budgetupdate(budget001mb: Budget001mb) {
        return this.putCallService(`${this.budgetUrl}`+"/update", {}, budget001mb);
    }

    budgeetdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.budgetUrl}`+"/delete", data);
    }

    budgetPdf() {
        return this.getCallService1(`${this.budgetUrl}` + "/pdf");
      }
    
      budgetExcel() {
        return this.getCallService1(`${this.budgetUrl}` + "/excel");
      }

}