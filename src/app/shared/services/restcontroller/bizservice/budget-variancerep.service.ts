import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Budgetvarreport001mb } from "../entities/Budgetvarreport001mb";

@Injectable()

export class BudgetVariancerepManager extends BaseService {

    private budgetVariancerepUrl: string = `${environment.apiUrl}/budgetvariancerep`;

    allbudvar() {
        return this.getCallService(`${this.budgetVariancerepUrl}`+"/findAll");
    }

    budvarsave(budgetvarreport001mb: Budgetvarreport001mb) {
        return this.postCallService(`${this.budgetVariancerepUrl}`+"/save", {}, budgetvarreport001mb);
    }

    budvarupdate(budgetvarreport001mb: Budgetvarreport001mb) {
        return this.putCallService(`${this.budgetVariancerepUrl}`+"/update", {}, budgetvarreport001mb);
    }

    budvardelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.budgetVariancerepUrl}`+"/delete", data);
    }

    budgetVariancerepPdf() {
        return this.getCallService1(`${this.budgetVariancerepUrl}` + "/pdf");
      }
    
      budgetVariancerepExcel() {
        return this.getCallService1(`${this.budgetVariancerepUrl}` + "/excel");
      }

}